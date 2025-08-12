import { Route, Routes } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import GenerateImage from "../GenerateImage/GenerateImage";
import CreateTemplatePage from "../CreateTemplatePage/CreateTemplatePage";
import TemplateEditorPage from "../TemplateEditorPage/TemplateEditorPage";
import SavedTemplate from "../SavedTemplate/SavedTemplate";
import ReEditor from "../ReEditor/ReEditor";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import UploadImagePage from "../UploadImage/UploadImage";
import ReEditorPage from "../ReEditorPage/ReEditorPage";

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/generate-image" element={<GenerateImage />} />
      <Route path="/create-template" element={<CreateTemplatePage />} />
      <Route path="/template-editor" element={<TemplateEditorPage />} />
      <Route path="/saved-templates" element={<SavedTemplate />} />
      <Route path="/re-edit" element={<ReEditorPage />} />
      <Route path="/re-edit-image" element={<UploadImagePage />} />

      <Route path="/reedit-image" element={<ReEditor />} />
    </Routes>
  );
}

export default RouteSwitch;
