// hooks/use-search.ts
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

export function useSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search"); 
    }

    replace(`?${params.toString()}`);
  }, 300);

  return {
    searchTerm: searchParams.get("search")?.toString() || "",
    handleSearch,
  };
}
