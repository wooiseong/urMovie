import { Box } from "@mui/material";
import QuoteBoard from "../components/QuoteBoard";
import JournalMetaForm from "../components/JournaIMetaForm";
import JournalContentEditor from "../components/JournalContentEditor";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import { useTranslation } from "react-i18next";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import {
  useCreateJournalMutation,
  useGetTagsQuery,
} from "src/generated/graphql";
import toast from "react-hot-toast";
import { useQueryWithLoader } from "src/globalHooks/useQueryWithLoader";

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
  const [formData, setFormData] = useState<JournalFormData>({
    movieName: "",
    director: [],
    actor: [],
    tag: [],
    image: "",
    content: {},
    quote: [],
  });

  const [createJournal, { loading }] = useCreateJournalMutation();

  const { data: tagData, loader, error } = useQueryWithLoader(useGetTagsQuery);

  const handleSubmit = async () => {
    try {
      const submitTag = formData.tag.filter(
        (t) => t.isNew || t.isEdited || t.isDeleted
      );

      const { data } = await createJournal({
        variables: {
          input: {
            movieName: formData.movieName,
            director: formData.director,
            actor: formData.actor,
            tag: submitTag,
            image: formData.image,
            content: formData.content,
            quote: formData.quote,
          },
        },
      });
      toast.success("日誌已成功建立！");
    } catch (error) {
      toast.error("建立失敗，請稍後重試");
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
      <JournalContentEditor setFormData={setFormData} />
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
