import { useState, useEffect, useCallback } from 'react';
import './SearchFilterBar.css';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  XMarkIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  TagIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const SearchFilterBar = ({ 
  onSearchChange, 
  onFiltersChange, 
  categories = [], 
  tones = [],
  className = "" 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    tone: '',
    dateRange: '',
    sortBy: 'newest'
  });
  const [activeFilters, setActiveFilters] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Debounced search
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearchChange(term);
    }, 300),
    [onSearchChange]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const count = Object.values(filters).filter(value => value && value !== 'newest').length;
    setActiveFilters(count);
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      tone: '',
      dateRange: '',
      sortBy: 'newest'
    });
    setSearchTerm('');
  };

  const FilterDropdown = ({ label, value, options, onChange, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center gap-1 md:gap-2 px-2 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 rounded-lg md:rounded-xl border transition-all duration-300 min-h-[44px]
            ${value 
              ? 'bg-gradient-to-r from-primary to-secondary text-primary-content border-transparent shadow-lg' 
              : 'bg-base-100/10 backdrop-blur-sm border-base-300/20 text-base-content hover:bg-base-100/20'
            }
            focus:outline-none focus:ring-2 focus:ring-primary/50
          `}
        >
          <Icon className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
          <span className="text-xs md:text-sm font-medium truncate max-w-[80px] md:max-w-none">
            {value || label}
          </span>
          <ChevronDownIcon className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="filter-dropdown absolute top-full left-0 mt-1 md:mt-2 w-48 md:w-56 bg-base-100/95 backdrop-blur-xl rounded-lg md:rounded-xl border border-base-300/20 shadow-xl z-50 max-h-[60vh] overflow-y-auto">
            <div className="p-1 md:p-2">
              <button
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                }}
                className="w-full text-left px-2 md:px-3 py-2 text-xs md:text-sm text-base-content hover:bg-base-200/50 rounded-md md:rounded-lg transition-colors min-h-[44px] flex items-center"
              >
                All {label}s
              </button>
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-2 md:px-3 py-2 text-xs md:text-sm text-base-content hover:bg-base-200/50 rounded-md md:rounded-lg transition-colors flex items-center justify-between min-h-[44px]"
                >
                  <span className="truncate">{option}</span>
                  {value === option && <CheckIcon className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`sticky top-2 md:top-4 z-40 ${className}`}>
      <div className="search-filter-bar bg-base-100/80 backdrop-blur-xl rounded-xl md:rounded-2xl border border-base-300/20 shadow-xl p-3 md:p-4 lg:p-6">
        {/* Main Search and Filter Layout */}
        <div className="flex flex-col lg:flex-row gap-3 md:gap-4 lg:gap-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-base-content/60" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, tag, or keyword…"
                className="
                  search-input w-full pl-10 md:pl-12 pr-10 md:pr-4 py-3 md:py-4 rounded-full
                  bg-base-100/50 backdrop-blur-sm
                  border border-base-300/30
                  text-base-content
                  placeholder-base-content/60
                  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent
                  focus:bg-base-100/70
                  transition-all duration-300
                  text-sm md:text-base lg:text-lg
                "
                aria-label="Search lessons"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-base-200/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Clear search"
                >
                  <XMarkIcon className="w-4 h-4 text-base-content/60" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 md:gap-3">
            {/* Category Filter */}
            <FilterDropdown
              label="Category"
              value={filters.category}
              options={categories}
              onChange={(value) => handleFilterChange('category', value)}
              icon={TagIcon}
            />

            {/* Tone Filter */}
            <FilterDropdown
              label="Tone"
              value={filters.tone}
              options={tones}
              onChange={(value) => handleFilterChange('tone', value)}
              icon={AdjustmentsHorizontalIcon}
            />

            {/* Sort Filter */}
            <FilterDropdown
              label="Sort"
              value={filters.sortBy}
              options={['newest', 'oldest', 'popular', 'alphabetical']}
              onChange={(value) => handleFilterChange('sortBy', value)}
              icon={CalendarIcon}
            />

            {/* Clear Filters Button */}
            {activeFilters > 0 && (
              <button
                onClick={clearAllFilters}
                className="
                  flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl
                  border border-base-300/50
                  text-base-content/70
                  hover:bg-base-200/50
                  transition-all duration-300
                  text-xs md:text-sm font-medium
                  min-h-[44px]
                "
              >
                <XMarkIcon className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Count Badge */}
        {activeFilters > 0 && (
          <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs md:text-sm text-base-content/70">
              {activeFilters} filter{activeFilters !== 1 ? 's' : ''} active
            </span>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {filters.category && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs">
                  {filters.category}
                </span>
              )}
              {filters.tone && (
                <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-lg text-xs">
                  {filters.tone}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;