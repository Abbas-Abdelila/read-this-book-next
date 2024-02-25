export interface BookSearchResult {
  key?: string;
  type?: string;
  seed?: string[];
  title: string; // Required
  title_suggest?: string;
  title_sort?: string;
  edition_count?: number;
  edition_key?: string[];
  publish_date?: string[];
  publish_year?: number[];
  first_publish_year?: number;
  isbn?: string[];
  last_modified_i?: number;
  ebook_count_i?: number;
  ebook_access?: string;
  has_fulltext?: boolean;
  public_scan_b?: boolean;
  readinglog_count?: number;
  want_to_read_count?: number;
  currently_reading_count?: number;
  already_read_count?: number;
  cover_edition_key?: string;
  cover_i: number; // Required
  publisher?: string[];
  publisher_facet?: string[];
  _version_?: number;
  author_facet?: string[];
  [key: string]: any;
}

export interface Book {
  start: number;
  num_found: number;
  docs: BookSearchResult[];
}
