import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import { JournalList } from "../components/JournalList";

const mockJournals = [
  {
    id: 1,
    title: "The Art of Code",
    author: "John Doe",
    tag: "Programming",
    content:
      "Exploring the beauty of writing clean, elegant code. Exploring the beauty of writing clean, elegant code. Exploring the beauty of writing clean, elegant code.",
    date: "2025-10-25",
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    title: "Mindful DevelopmentMindfu",
    author: "Jane Smith",
    tag: "Wellness",
    content: "Balancing creativity and productivity in software development.",
    date: "2025-10-20",
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    title: "GraphQL Simplified",
    author: "Alex Lee",
    tag: "Tech",
    content: "A practical introduction to GraphQL for frontend engineers.",
    date: "2025-10-15",
    image: "https://picsum.photos/300/200?random=3",
  },
  {
    id: 1,
    title: "The Art of Code",
    author: "John Doe",
    tag: "Programming",
    content: "Exploring the beauty of writing clean, elegant code.",
    date: "2025-10-25",
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    title: "Mindful Development",
    author: "Jane Smith",
    tag: "Wellness",
    content: "Balancing creativity and productivity in software development.",
    date: "2025-10-20",
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    title: "GraphQL Simplified",
    author: "Alex Lee",
    tag: "Tech",
    content: "A practical introduction to GraphQL for frontend engineers.",
    date: "2025-10-15",
    image: "https://picsum.photos/300/200?random=3",
  },
  {
    id: 1,
    title: "The Art of Code",
    author: "John Doe",
    tag: "Programming",
    content: "Exploring the beauty of writing clean, elegant code.",
    date: "2025-10-25",
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    title: "Mindful Development",
    author: "Jane Smith",
    tag: "Wellness",
    content: "Balancing creativity and productivity in software development.",
    date: "2025-10-20",
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    title: "GraphQL Simplified",
    author: "Alex Lee",
    tag: "Tech",
    content: "A practical introduction to GraphQL for frontend engineers.",
    date: "2025-10-15",
    image: "https://picsum.photos/300/200?random=3",
  },
];

const PreviousEditSelection = () => {
  const { t } = useTranslation();
  return (
    <Box mb={2}>
      <CustomSectionTitle label={t("home.recentEdit")} />
      <JournalList journals={mockJournals} />
    </Box>
  );
};

export default PreviousEditSelection;
