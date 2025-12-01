import { Box } from "@mui/material";
import QuoteBoard from "../components/QuoteBoard";
import JournalMetaForm from "../components/JournaIMetaForm";
import JournalContentEditor from "../components/JournalContentEditor";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import { useTranslation } from "react-i18next";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import {
  useCreateJournalMutation,
  useGetTagsQuery,
  useUpdateJournalMutation,
} from "src/generated/graphql";
import toast from "react-hot-toast";
import { useQueryWithLoader } from "src/globalHooks/useQueryWithLoader";
import { useAppSelector, useAppDispatch } from "src/store/hook";
import { setSelectedJournal } from "src/store/modules/journalSlice";

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
  const { selectedJournal } = useAppSelector((state) => state.journal);
  const dispatch = useAppDispatch();
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

  const [createJournal, { loading: createLoading }] =
    useCreateJournalMutation();
  const [updateJournal, { loading: updateLoading }] =
    useUpdateJournalMutation();

  const { data: tagData, loader, error } = useQueryWithLoader(useGetTagsQuery);

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
      journalTags.forEach((journalTag) => {
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

    return () => {
      // No cleanup for selectedJournal here, as it's handled in a separate effect for unmount.
    };
  }, [selectedJournal, tagData, dispatch]);

  const handleSubmit = async () => {
    try {
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
          dispatch(setSelectedJournal(null));
        }
      } else {
        const { data } = await createJournal({
          variables: {
            input,
          },
        });
        if (data?.createJournal) {
          toast.success("日誌已成功建立！");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(
        selectedJournal ? "更新失敗，請稍後重試" : "建立失敗，請稍後重試"
      );
    }
  };

  return (
    <Box sx={{ pb: "70px", position: "relative" }}>
      <CustomSectionTitle label={t("home.createEdit")} />
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
      <Box sx={{ position: "absolute", bottom: "2%", right: "0" }}>
        <CustomActionButton
          icon={<SendIcon />}
          onClick={handleSubmit}
          label={t("operation.submit")}
        />
      </Box>
    </Box>
  );
};

export default EditJournalPage;
