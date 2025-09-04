// sanity/deskStructure.ts
import type { StructureResolver } from "sanity/desk";

const deskStructure: StructureResolver = (S) =>
  S.list().title("Content").items([
    S.documentTypeListItem("product").title("Products"),
    S.documentTypeListItem("category").title("Categories"),
    S.documentTypeListItem("brand").title("Brand"),
    S.documentTypeListItem("resource").title("Resources"),
    S.documentTypeListItem("faq").title("FAQs"),
    S.documentTypeListItem("page").title("Pages"),
    S.listItem()
      .title("Site Settings")
      .child(
        S.editor()
          .id("siteSettings")
          .schemaType("siteSettings")
          .documentId("siteSettings")
      ),
    S.documentTypeListItem("formSubmission").title("Form Submissions"),
  ]);

export default deskStructure;
