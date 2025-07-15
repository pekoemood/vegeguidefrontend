interface ImportMetaEnv {
  readonly VITE_RAILS_API: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}