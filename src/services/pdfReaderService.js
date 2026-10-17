import axiosInstance from "../axios/axios";

export const uploadPdf = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post("/embedding/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response?.status === 200)
      return {
        success: true,
        message:
          response?.data?.message ?? "Successfully uploaded the pdf document",
        data: response?.data,
      };
    else throw new Error("Failed to upload the pdf document");
  } catch (err) {
    console.log("error thrown while uploading pdf document", err);
    return {
      success: false,
      message: "Failed to upload pdf document",
      data: null,
    };
  }
};

export const getPdfs = async () => {
  try {
    const response = await axiosInstance.get("/embedding/documents");

    if (response?.status === 200) {
      return {
        success: true,
        message: "Successfully fetched the pdf documents",
        data: response?.data,
      };
    } else throw new Error("Failed to fetch the pdf documents");
  } catch (err) {
    console.log("error thrown while fetching pdf documents", err);
    return {
      success: false,
      message: "Failed to fetch pdf documents",
      data: null,
    };
  }
};

export const getMessages = async (pdf_id) => {
  try {
    const response = await axiosInstance.post("/embedding/messages", {
      pdf_id,
    });

    if (response?.status === 200) {
      return {
        success: true,
        message: "Successfully fetched the messages for the pdf document",
        data: response?.data?.chat ?? [],
      };
    } else throw new Error("Failed to fetch the messages for the pdf document");
  } catch (err) {
    console.log(
      "error thrown while fetching messages for the pdf document",
      err,
    );
    return {
      success: false,
      message: "Failed to fetch messages for the pdf document",
      data: null,
    };
  }
};

export const askQuestion = async (pdf_id, question) => {
  try {
    const response = await axiosInstance.post("/embedding/chat", {
      pdf_id,
      question,
    });
    if (response?.status === 200) {
      return {
        success: true,
        message: "Successfully fetched the answer for the question",
        data: response?.data?.chat ?? "",
      };
    } else throw new Error("Failed to fetch the answer for the question");
  } catch (err) {
    console.log("error thrown while fetching answer for the question", err);
    return {
      success: false,
      message: "Failed to fetch answer for the question",
      data: null,
    };
  }
};

export const downloadS3File = async (url, name) => {
  try {
    const response = await axiosInstance.post(
      "/embedding/download_file",
      { url },
      {
        responseType: "blob",
      },
    );

    const blobUrl = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = name;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Failed to download file:", error);
  }
};
