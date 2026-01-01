import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import CustomTextField from "src/globalComponents/CustomTextfield";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store/hook";
import {
  setSelectedJournal,
  setDraftJournal,
} from "src/store/modules/journalSlice";
import { useState } from "react";
import {
  useCreateJournalMutation,
  GetJournalsDocument,
  GetJournalsQuery,
} from "src/generated/graphql";
import toast from "react-hot-toast";

const CreateEditSelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [movieName, setMovieName] = useState("");
  const [content, setContent] = useState("");

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
    },
  });

  const handleSubmit = async () => {
    if (!movieName.trim()) {
      toast.error("電影名稱為必填");
      return;
    }

    try {
      const input = {
        movieName: movieName,
        content: content
          ? {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: content,
                    },
                  ],
                },
              ],
            }
          : {
              type: "doc",
              content: [],
            },
        director: [],
        actor: [],
        tag: [],
        image: "",
        quote: [],
      };

      const { data } = await createJournal({
        variables: {
          input,
        },
      });

      if (data?.createJournal) {
        toast.success("日誌已成功建立！");
        setMovieName("");
        setContent("");
      }
    } catch (error) {
      console.error(error);
      toast.error("建立失敗，請稍後重試");
    }
  };

  return (
    <Box>
      <CustomSectionTitle label={t("home.createEdit")} />

      <Box
        sx={{
          position: "relative",
          backgroundColor: "background.paper",
          p: 2,
          borderRadius: 2,
        }}
      >
        {/* movie name */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <CustomTextField
            placeholder={t("home.movieName")}
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            sx={{
              minWidth: "200px",
              flexGrow: 1,
              maxWidth: "100%",
              "& .MuiOutlinedInput-root": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
                padding: "10px 10px 10px 15px",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "1.25rem",
                fontWeight: 600,
                padding: 0,
              },
              "& .MuiOutlinedInput-input::placeholder": {
                fontSize: "1.25rem",
                fontWeight: 600,
                opacity: 1,
              },
            }}
          />
          <IconButton
            onClick={() => {
              dispatch(setSelectedJournal(null));
              // Save draft data if there's any content
              if (movieName || content) {
                const contentData = content
                  ? {
                      type: "doc",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: content,
                            },
                          ],
                        },
                      ],
                    }
                  : {
                      type: "doc",
                      content: [],
                    };
                dispatch(setDraftJournal({ movieName, content: contentData }));
              }
              navigate("editJournal");
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>

        {/* content */}
        <CustomTextField
          placeholder={t("home.journalContent")}
          fullWidth
          multiline
          minRows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <CustomActionButton
          icon={<SendIcon />}
          label={t("operation.submit")}
          sx={{ position: "absolute", right: "1.5%", bottom: "6%" }}
          onClick={handleSubmit}
          loading={createLoading}
        />
      </Box>
    </Box>
  );
};

export default CreateEditSelection;
