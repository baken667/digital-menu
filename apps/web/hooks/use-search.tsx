import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

export function useSearch(queryParam: string = "search") {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    if (term) {
      params.set(queryParam, term);
    } else {
      params.delete(queryParam); 
    }

    replace(`?${params.toString()}`);
  }, 300);

  return {
    searchTerm: searchParams.get(queryParam)?.toString() || "",
    handleSearch,
  };
}
