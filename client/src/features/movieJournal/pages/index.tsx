import { Box } from "@mui/material";
import { useState, useMemo } from "react";
import { useGetJournalsQuery } from "src/generated/graphql";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { setViewMode } from "src/store/modules/journalSlice";
import JournalContainer from "../components/JournalContainer";
import JournalWrapper from "../components/JournalWrapper";

export interface JournalFilters {
  movieName?: string;
  startDate?: string;
  endDate?: string;
  tag?: string[];
  orderBy?: string;
  order?: string;
}

const MovieJournalPage = () => {
  const dispatch = useDispatch();
  const viewMode = useSelector((state: RootState) => state.journal.viewMode);
  const isListView = viewMode === "list";

  const [filters, setFilters] = useState<JournalFilters>({});
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: journalData,
    loading,
    error,
  } = useGetJournalsQuery({
    variables: {
      startDate: filters.startDate,
      endDate: filters.endDate,
      tag: filters.tag && filters.tag.length > 0 ? filters.tag : undefined,
      orderBy: filters.orderBy,
      order: filters.order,
    },
  });

  // Filter journals client-side based on search term
  const filteredJournals = useMemo(() => {
    if (!journalData?.journals) return [];

    if (!searchTerm.trim()) {
      return journalData.journals;
    }

    const lowerSearch = searchTerm.toLowerCase();
    return journalData.journals.filter((journal) => {
      // Check movie name
      const matchesMovieName = journal.movieName
        ?.toLowerCase()
        .includes(lowerSearch);

      // Check director array
      const matchesDirector = journal.director?.some((d) =>
        d.toLowerCase().includes(lowerSearch)
      );

      // Check actor array
      const matchesActor = journal.actor?.some((a) =>
        a.toLowerCase().includes(lowerSearch)
      );

      // Check content (JSON field, convert to string)
      const matchesContent =
        typeof journal.content === "string"
          ? journal.content.toLowerCase().includes(lowerSearch)
          : JSON.stringify(journal.content).toLowerCase().includes(lowerSearch);

      return (
        matchesMovieName || matchesDirector || matchesActor || matchesContent
      );
    });
  }, [journalData?.journals, searchTerm]);

  const handleFilterChange = (newFilters: Partial<JournalFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleToggleView = () => {
    dispatch(setViewMode(isListView ? "grid" : "list"));
  };

  return (
    <Box>
      <JournalWrapper
        filters={filters}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalCount={filteredJournals.length}
        isListView={isListView}
        onToggleView={handleToggleView}
      />
      <JournalContainer journals={filteredJournals} isListView={isListView} />
    </Box>
  );
};

export default MovieJournalPage;
