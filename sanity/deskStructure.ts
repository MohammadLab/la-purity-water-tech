// Minimal TS typing to avoid heavy imports
const deskStructure = (S: any) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Products")
        .child(S.documentTypeList("product").title("Products")),
      S.listItem()
        .title("Categories")
        .child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .title("Brand")
        .child(S.documentTypeList("brand").title("Brand")),
      S.listItem()
        .title("Resources")
        .child(S.documentTypeList("resource").title("Resources")),
      S.listItem()
        .title("FAQs")
        .child(S.documentTypeList("faq").title("FAQs")),
      S.listItem()
        .title("Pages")
        .child(S.documentTypeList("page").title("Pages")),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.listItem()
        .title("Form Submissions")
        .child(S.documentTypeList("formSubmission").title("Form Submissions")),
    ]);

export default deskStructure;
