import { Box } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { useGetJournalsQuery } from "src/generated/graphql";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { setViewMode } from "src/store/modules/journalSlice";
import JournalContainer from "../components/JournalContainer";
import JournalWrapper from "../components/JournalWrapper";
import CustomPagination from "src/globalComponents/CustomPagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: journalData,
    loading,
    error,
  } = useGetJournalsQuery({
    variables: {
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      startDate: filters.startDate,
      endDate: filters.endDate,
      tag: filters.tag && filters.tag.length > 0 ? filters.tag : undefined,
      orderBy: filters.orderBy,
      order: filters.order,
    },
  });

  const journals = journalData?.journals?.journals || [];
  const totalCount = journalData?.journals?.totalCount || 0;

  // Filter journals client-side based on search term
  const filteredJournals = useMemo(() => {
    if (!journals) return [];

    if (!searchTerm.trim()) {
      return journals;
    }

    const lowerSearch = searchTerm.toLowerCase();
    return journals.filter((journal) => {
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
  }, [journals, searchTerm]);

  // Reset page when filters or search term change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

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
        totalCount={searchTerm.trim() ? filteredJournals.length : totalCount}
        isListView={isListView}
        onToggleView={handleToggleView}
      />
      <JournalContainer journals={filteredJournals} isListView={isListView} />
      {!searchTerm.trim() && (
        <CustomPagination
          currentPage={currentPage}
          totalItems={totalCount}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </Box>
  );
};

export default MovieJournalPage;
