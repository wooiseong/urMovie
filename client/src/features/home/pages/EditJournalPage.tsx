import { Box } from "@mui/material";
import QuoteBoard from "../components/QuoteBoard";
import JournalMetaForm from "../components/JournaIMetaForm";
import JournalContentEditor from "../components/JournalContentEditor";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import { useTranslation } from "react-i18next";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  useCreateJournalMutation,
  useGetTagsQuery,
  useUpdateJournalMutation,
  GetJournalsDocument,
  GetJournalsQuery,
  GetTagsDocument,
  GetTagsQuery,
} from "src/generated/graphql";
import toast from "react-hot-toast";
import { useQueryWithLoader } from "src/globalHooks/useQueryWithLoader";
import { useAppSelector, useAppDispatch } from "src/store/hook";
import {
  setSelectedJournal,
  setDraftJournal,
} from "src/store/modules/journalSlice";
import ConfirmDialog from "src/globalComponents/ConfirmDialog";
import { useNavigate, useLocation } from "react-router-dom";

export interface Quote {
  name?: string | null;
  content?: string | null;
  backgroundColor?: string | null;
  textColor?: string | null;
}

export interface selectableTags {
  id: string;
  name: string;
}

export interface formTag extends selectableTags {
  selected: boolean;
  isNew?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
}

export interface JournalFormData {
  movieName: string;
  director: string[];
  actor: string[];
  tag: formTag[];
  image: string;
  content: any;
  quote: Quote[];
}

const EditJournalPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedJournal, draftJournal } = useAppSelector(
    (state) => state.journal
  );
  const dispatch = useAppDispatch();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const isSubmitting = useRef(false);
  const hasUnsavedChanges = useRef(true);
  const [formData, setFormData] = useState<JournalFormData>({
    movieName: "",
    director: [],
    actor: [],
    tag: [],
    image: "",
    content: {
      type: "doc",
      content: [],
    },
    quote: [],
  });
  console.log(draftJournal);
  const [createJournal, { loading: createLoading }] = useCreateJournalMutation({
    update(cache, result) {
      const newJournal = result.data?.createJournal;
      if (!newJournal) return;

      // Update the query with limit: 10 (used in PreviousEditSection)
      const existingJournals = cache.readQuery<GetJournalsQuery>({
        query: GetJournalsDocument,
        variables: { limit: 10 },
      });

      if (existingJournals) {
        const updatedJournals = [
          newJournal,
          ...(existingJournals.journals?.journals ?? []),
        ];
        // Keep only the first 10 journals
        const limitedJournals = updatedJournals.slice(0, 10);

        cache.writeQuery({
          query: GetJournalsDocument,
          variables: { limit: 10 },
          data: {
            journals: {
              journals: limitedJournals,
              totalCount: (existingJournals.journals?.totalCount ?? 0) + 1,
            },
          },
        });
      }

      // Update the query used by MovieJournalPage (with offset)
      const movieJournalQuery = cache.readQuery<GetJournalsQuery>({
        query: GetJournalsDocument,
        variables: { limit: 10, offset: 0 },
      });

      if (movieJournalQuery) {
        const updatedJournals = [
          newJournal,
          ...(movieJournalQuery.journals?.journals ?? []),
        ];
        const limitedJournals = updatedJournals.slice(0, 10);

        cache.writeQuery({
          query: GetJournalsDocument,
          variables: { limit: 10, offset: 0 },
          data: {
            journals: {
              journals: limitedJournals,
              totalCount: (movieJournalQuery.journals?.totalCount ?? 0) + 1,
            },
          },
        });
      }

      // Update tags cache based on tag operations
      const existingTagsCache = cache.readQuery<GetTagsQuery>({
        query: GetTagsDocument,
      });

      if (existingTagsCache) {
        let updatedTagsList = [...(existingTagsCache.getTags ?? [])];

        // Handle deleted tags - remove from cache
        const deletedTags = formData.tag.filter((t) => t.isDeleted && !t.isNew);
        deletedTags.forEach((deletedTag) => {
          updatedTagsList = updatedTagsList.filter(
            (t) => t.id !== deletedTag.id
          );
        });

        // Handle edited tags - update names in cache
        const editedTags = formData.tag.filter((t) => t.isEdited && !t.isNew);
        editedTags.forEach((editedTag) => {
          const index = updatedTagsList.findIndex((t) => t.id === editedTag.id);
          if (index !== -1) {
            updatedTagsList[index] = {
              ...updatedTagsList[index],
              name: editedTag.name,
            };
          }
        });

        // Handle new tags - add to cache
        const newTagsFromForm = formData.tag.filter(
          (t) => t.isNew && t.selected
        );
        if (newTagsFromForm.length > 0) {
          const existingTagIds = new Set(updatedTagsList.map((t) => t.id));
          const responseTags = newJournal.tag ?? [];

          // Match new tags by name and add to cache if not already there
          const tagsToAdd = responseTags.filter((responseTag: any) => {
            const wasNew = newTagsFromForm.some(
              (formTag) => formTag.name === responseTag.name
            );
            return wasNew && !existingTagIds.has(responseTag.id);
          });

          tagsToAdd.forEach((tag: any) => {
            updatedTagsList.push({
              __typename: "Tag" as const,
              id: tag.id,
              name: tag.name,
            });
          });
        }

        // Write updated tags back to cache
        cache.writeQuery({
          query: GetTagsDocument,
          data: {
            getTags: updatedTagsList,
          },
        });
      }
    },
  });
  const [updateJournal, { loading: updateLoading }] = useUpdateJournalMutation({
    update(cache, result) {
      const updatedJournal = result.data?.updateJournal;
      if (!updatedJournal) return;

      // Update the cache by modifying the specific journal
      cache.modify({
        fields: {
          journals(existingJournalsRef, { readField }) {
            // Update all cached queries that contain this journal
            return existingJournalsRef;
          },
        },
      });

      // Alternatively, update specific cached queries
      // This ensures the updated journal appears correctly in all views
      cache.evict({ fieldName: "journals" });
      cache.gc();

      // Update tags cache based on tag operations
      const existingTagsCache = cache.readQuery<GetTagsQuery>({
        query: GetTagsDocument,
      });

      if (existingTagsCache) {
        let updatedTagsList = [...(existingTagsCache.getTags ?? [])];

        // Handle deleted tags - remove from cache
        const deletedTags = formData.tag.filter((t) => t.isDeleted && !t.isNew);
        deletedTags.forEach((deletedTag) => {
          updatedTagsList = updatedTagsList.filter(
            (t) => t.id !== deletedTag.id
          );
        });

        // Handle edited tags - update names in cache
        const editedTags = formData.tag.filter((t) => t.isEdited && !t.isNew);
        editedTags.forEach((editedTag) => {
          const index = updatedTagsList.findIndex((t) => t.id === editedTag.id);
          if (index !== -1) {
            updatedTagsList[index] = {
              ...updatedTagsList[index],
              name: editedTag.name,
            };
          }
        });

        // Handle new tags - add to cache
        const newTagsFromForm = formData.tag.filter(
          (t) => t.isNew && t.selected
        );
        if (newTagsFromForm.length > 0) {
          const existingTagIds = new Set(updatedTagsList.map((t) => t.id));
          const responseTags = updatedJournal.tag ?? [];

          // Match new tags by name and add to cache if not already there
          const tagsToAdd = responseTags.filter((responseTag: any) => {
            const wasNew = newTagsFromForm.some(
              (formTag) => formTag.name === responseTag.name
            );
            return wasNew && !existingTagIds.has(responseTag.id);
          });

          tagsToAdd.forEach((tag: any) => {
            updatedTagsList.push({
              __typename: "Tag" as const,
              id: tag.id,
              name: tag.name,
            });
          });
        }

        // Write updated tags back to cache
        cache.writeQuery({
          query: GetTagsDocument,
          data: {
            getTags: updatedTagsList,
          },
        });
      }
    },
  });

  const { data: tagData, loader, error } = useQueryWithLoader(useGetTagsQuery);
  const location = useLocation();
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );

  // Handle browser back/refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges.current && !isSubmitting.current) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Block navigation when there are unsaved changes
  useEffect(() => {
    if (!hasUnsavedChanges.current || isSubmitting.current) return;

    const handlePopState = (e: PopStateEvent) => {
      if (hasUnsavedChanges.current && !isSubmitting.current) {
        e.preventDefault();
        // Push current state back to prevent navigation
        window.history.pushState(null, "", window.location.pathname);
        setConfirmDialogOpen(true);
        setPendingNavigation("back");
      }
    };

    // Push a dummy state to detect back button
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Intercept link clicks
  useEffect(() => {
    if (!hasUnsavedChanges.current || isSubmitting.current) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href && !link.href.startsWith("javascript:")) {
        const url = new URL(link.href);
        const currentPath = window.location.pathname;
        const targetPath = url.pathname;

        if (
          targetPath !== currentPath &&
          hasUnsavedChanges.current &&
          !isSubmitting.current
        ) {
          e.preventDefault();
          e.stopPropagation();
          setPendingNavigation(targetPath);
          setConfirmDialogOpen(true);
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  // Load draft data once on mount and clear it immediately
  useEffect(() => {
    if (draftJournal && !selectedJournal) {
      setFormData((prev) => ({
        ...prev,
        movieName: draftJournal.movieName,
        content: draftJournal.content,
      }));
      // Clear draft immediately after loading
      dispatch(setDraftJournal(null));
    }
  }, []); // Empty dependency array - only run once on mount

  useEffect(() => {
    // 當 tagData 載入後，如果是「新增」模式，則初始化 tag
    if (!selectedJournal && tagData) {
      const allTags = (tagData?.getTags ?? []).map((tag) => ({
        id: tag.id,
        name: tag.name,
        selected: false,
        isNew: false,
        isEdited: false,
        isDeleted: false,
      }));

      setFormData((prev) => ({
        ...prev,
        tag: allTags,
      }));

      return;
    }

    if (selectedJournal) {
      const allTagsData = tagData?.getTags ?? [];
      const journalTags = selectedJournal.tag ?? [];

      const combinedTagsMap = new Map<string, formTag>();

      // Populate with all available tags, initially unselected
      allTagsData.forEach((tag) => {
        combinedTagsMap.set(tag.id, {
          id: tag.id,
          name: tag.name,
          selected: false,
          isNew: false,
          isEdited: false,
          isDeleted: false,
        });
      });

      // Override/add with selectedJournal's tags, marking them as selected
      journalTags.forEach((journalTag: any) => {
        combinedTagsMap.set(journalTag.id, {
          id: journalTag.id,
          name: journalTag.name,
          selected: true, // Always selected if from selectedJournal
          isNew: false,
          isEdited: false,
          isDeleted: false,
        });
      });

      const finalTags = Array.from(combinedTagsMap.values());

      setFormData({
        movieName: selectedJournal.movieName,
        director: selectedJournal.director ?? [],
        actor: selectedJournal.actor ?? [],
        tag: finalTags,
        image: selectedJournal.image ?? "",
        content: selectedJournal.content,
        quote: selectedJournal.quote ?? [],
      });
    }
  }, [selectedJournal, tagData]);

  const handleSubmit = async () => {
    try {
      // Validate movie name
      if (!formData.movieName.trim()) {
        toast.error("電影名稱不能為空");
        return;
      }

      // Validate content (check if content array is empty or has no meaningful content)
      const hasContent =
        formData.content?.content &&
        Array.isArray(formData.content.content) &&
        formData.content.content.length > 0 &&
        formData.content.content.some((node: any) => {
          // Check if node has text content
          if (node.type === "paragraph" || node.type === "heading") {
            return node.content && node.content.length > 0;
          }
          // For other node types (image, code block, etc.)
          return true;
        });

      if (!hasContent) {
        toast.error("日誌內容不能為空");
        return;
      }

      isSubmitting.current = true;
      const submitTag = formData.tag
        .filter((t) => t.selected)
        .map((tag) => ({
          id: tag.id,
          name: tag.name,
          selected: tag.selected,
          isNew: tag.isNew,
          isEdited: tag.isEdited,
          isDeleted: tag.isDeleted,
        }));

      const cleanedQuotes = formData.quote.map((q) => ({
        name: q.name,
        content: q.content,
        backgroundColor: q.backgroundColor,
        textColor: q.textColor,
      }));

      const input = {
        movieName: formData.movieName,
        director: formData.director,
        actor: formData.actor,
        tag: submitTag,
        image: formData.image,
        content: formData.content,
        quote: cleanedQuotes,
      };

      if (selectedJournal) {
        const { data } = await updateJournal({
          variables: {
            id: selectedJournal.id,
            input,
          },
        });
        if (data?.updateJournal) {
          toast.success("日誌已成功更新！");
          hasUnsavedChanges.current = false;
          dispatch(setSelectedJournal(null));
          navigate("/moviejournal");
        }
      } else {
        const { data } = await createJournal({
          variables: {
            input,
          },
        });
        if (data?.createJournal) {
          toast.success("日誌已成功建立！");
          hasUnsavedChanges.current = false;
          navigate("/moviejournal");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(
        selectedJournal ? "更新失敗，請稍後重試" : "建立失敗，請稍後重試"
      );
      isSubmitting.current = false;
    }
  };

  const handleDiscard = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDiscard = () => {
    hasUnsavedChanges.current = false;
    dispatch(setSelectedJournal(null));
    setConfirmDialogOpen(false);

    if (pendingNavigation === "back") {
      // User clicked browser back button
      window.history.back();
    } else if (pendingNavigation) {
      // User clicked a link to navigate to another page
      navigate(pendingNavigation);
    } else {
      // User clicked the discard button
      navigate(-1);
    }

    setPendingNavigation(null);
  };

  const handleCancelDiscard = () => {
    setConfirmDialogOpen(false);
    setPendingNavigation(null);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Header with action buttons */}
      <Box
        sx={{
          pb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "background.default",
        }}
      >
        <CustomSectionTitle label={t("home.createEdit")} />
        <Box sx={{ display: "flex", gap: 2 }}>
          <CustomActionButton
            icon={<SendIcon />}
            onClick={handleSubmit}
            label={t("operation.submit")}
            sx={{}}
          />
          <CustomActionButton
            icon={<CloseIcon />}
            onClick={handleDiscard}
            label="放棄"
            color="error"
            sx={{}}
          />
        </Box>
      </Box>

      <JournalMetaForm
        formData={formData}
        setFormData={setFormData}
        tagData={tagData?.getTags ?? []}
      />

      <JournalContentEditor
        initialContent={formData.content}
        setFormData={setFormData}
      />
      <QuoteBoard quote={formData.quote} setFormData={setFormData} />

      {/* Confirm Discard Dialog */}
      <ConfirmDialog
        open={confirmDialogOpen}
        title="放棄編輯"
        message="確定要放棄目前的編輯嗎？所有未儲存的變更將會遺失。"
        confirmText="放棄"
        cancelText="取消"
        onConfirm={handleConfirmDiscard}
        onCancel={handleCancelDiscard}
        confirmColor="error"
      />
    </Box>
  );
};

export default EditJournalPage;
