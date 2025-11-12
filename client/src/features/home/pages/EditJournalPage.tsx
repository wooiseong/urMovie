import { Box } from "@mui/material";
import QuoteBoard from "../components/QuoteBoard";
import JournalMetaForm from "../components/JournaIMetaForm";
import JournalContentEditor from "../components/JournalContentEditor";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import { useTranslation } from "react-i18next";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useCreateJournalMutation } from "src/generated/graphql";

export interface Quote {
  name?: string | null;
  content?: string | null;
  backgroundColor?: string | null;
  textColor?: string | null;
}

export interface TagItem {
  name: string;
  selected: boolean;
}

export interface JournalFormData {
  movieName: string;
  director: string[];
  actor: string[];
  tag: TagItem[];
  image: string;
  title: string;
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
    title: "",
    content: {},
    quote: [],
  });

  const [createJournal, { loading }] = useCreateJournalMutation();

  const handleSubmit = async () => {
    try {
      console.log(formData);
      // const { data } = await createJournal({
      //   variables: {
      //     input: {
      //       movieName: formData.movieName,
      //       director: formData.director,
      //       actor: formData.actor,
      //       tag: formData.tag,
      //       image: formData.image, // base64 or URL
      //       title: formData.title,
      //       content: formData.content, // tiptap json
      //       quote: formData.quote,
      //     },
      //   },
      // });
      // toast.success("日誌已成功建立！");
      // console.log("✅ 新 journal:", data?.createJournal);
    } catch (error) {
      console.error(error);
      // toast.error("建立失敗，請稍後重試");
    }
  };

  return (
    <Box sx={{ pb: "70px", position: "relative" }}>
      <CustomSectionTitle label={t("home.createEdit")} />
      <JournalMetaForm formData={formData} setFormData={setFormData} />
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
