import {
  CloudUpload,
  Delete,
  Description,
  InsertDriveFile,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";

interface FileUploadProps {
  acceptedTypes?: string[];
  maxSizeInMB?: number;
  multiple?: boolean;
  maxFiles?: number;
  onFilesChange?: (
    files: { file: File; preview: string; fileType: string }[],
  ) => void;
}

interface FileWithData {
  file: File;
  preview: string;
  fileType: string;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const FileUpload: React.FC<FileUploadProps> = ({
  acceptedTypes = ["image/*", ".pdf", ".doc", ".docx"],
  maxSizeInMB = 5,
  multiple = true,
  maxFiles = 10,
  onFilesChange,
}) => {
  const [files, setFiles] = useState<FileWithData[]>([]);
  const [error, setError] = useState<string>("");

  const maxSize = maxSizeInMB * 1024 * 1024;

  const getFileType = (file: File): string => {
    return file.type || "application/octet-stream";
  };

  const getFileExtension = (filename: string): string => {
    return filename
      .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
      .toLowerCase();
  };

  const getFileIcon = (
    fileType: string,
    filename: string = "",
  ): React.ReactNode => {
    if (fileType.startsWith("image/")) {
      return null;
    }

    const extension = getFileExtension(filename);

    const extensionMap: { [key: string]: React.ReactNode } = {
      pdf: <Description color="error" />,
      doc: <Description color="primary" />,
      docx: <Description color="primary" />,
      xls: <Description color="success" />,
      xlsx: <Description color="success" />,
      ppt: <Description color="warning" />,
      pptx: <Description color="warning" />,
      txt: <InsertDriveFile color="action" />,
      csv: <InsertDriveFile color="action" />,
      zip: <InsertDriveFile color="action" />,
      rar: <InsertDriveFile color="action" />,
    };

    return extensionMap[extension] || <InsertDriveFile color="action" />;
  };

  const generatePreview = async (
    file: File,
  ): Promise<{ preview: string; fileType: string }> => {
    const fileType = getFileType(file);

    if (fileType.startsWith("image/")) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) =>
          resolve({
            preview: e.target?.result as string,
            fileType,
          });
        reader.readAsDataURL(file);
      });
    } else {
      return {
        preview: "",
        fileType,
      };
    }
  };

  const isFileTypeAccepted = (file: File, acceptedTypes: string[]): boolean => {
    if (acceptedTypes.length === 0) return true;

    const fileType = getFileType(file);
    const fileExtension = getFileExtension(file.name);

    return acceptedTypes.some((type) => {
      if (type.endsWith("/*")) {
        const category = type.split("/")[0];
        return fileType.startsWith(`${category}/`);
      }

      if (type.includes("/")) {
        return fileType === type;
      }

      if (type.startsWith(".")) {
        return fileExtension === type.slice(1).toLowerCase();
      }

      return false;
    });
  };

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || []);
      setError("");

      event.target.value = "";

      if (!multiple && selectedFiles.length > 1) {
        setError("Apenas um arquivo é permitido");
        return;
      }

      if (selectedFiles.length + files.length > maxFiles) {
        setError(`Máximo de ${maxFiles} arquivos permitidos`);
        return;
      }

      const validFiles: FileWithData[] = [];

      for (const file of selectedFiles) {
        if (
          acceptedTypes.length > 0 &&
          !isFileTypeAccepted(file, acceptedTypes)
        ) {
          setError(`Tipo de arquivo não permitido: ${file.name}`);
          return;
        }

        if (file.size > maxSize) {
          setError(
            `Arquivo muito grande: ${file.name} (Máximo: ${maxSizeInMB}MB)`,
          );
          return;
        }

        try {
          const { preview, fileType } = await generatePreview(file);
          validFiles.push({
            file,
            preview,
            fileType,
          });
        } catch (_error) {
          validFiles.push({
            file,
            preview: "",
            fileType: getFileType(file),
          });
        }
      }

      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      onFilesChange?.(newFiles);
    },
    [
      files,
      multiple,
      maxFiles,
      acceptedTypes,
      maxSize,
      maxSizeInMB,
      onFilesChange,
    ],
  );

  const handleDelete = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange?.(newFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getAcceptedTypesString = (): string => {
    return acceptedTypes
      .map((type) => {
        if (type.endsWith("/*")) {
          return type.replace("/*", "");
        }
        return type;
      })
      .join(", ");
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);

    if (droppedFiles.length > 0) {
      const mockEvent = {
        target: {
          files: event.dataTransfer.files,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      await handleFileSelect(mockEvent);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          textAlign: "center",
          border: "2px dashed",
          borderColor: "grey.300",
          backgroundColor: "grey.50",
          cursor: "pointer",
          "&:hover": {
            borderColor: "primary.main",
            backgroundColor: "grey.100",
          },
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
          sx={{ mb: 1 }}
        >
          Selecionar Arquivos
          <VisuallyHiddenInput
            type="file"
            multiple={multiple}
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
          />
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {multiple
            ? "Arraste e solte arquivos aqui ou clique para selecionar"
            : "Clique para selecionar um arquivo"}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Tipos permitidos: {getAcceptedTypesString()} | Tamanho máximo:{" "}
          {maxSizeInMB}MB | Máximo: {maxFiles} arquivos
        </Typography>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Arquivos selecionados ({files.length})
          </Typography>

          <Grid container spacing={2}>
            {files.map((fileData, index) => (
              <Grid
                key={`${fileData.file.name}-${index}-${fileData.file.lastModified}`}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1,
                    position: "relative",
                    textAlign: "center",
                    width: 130,
                    height: 170,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(index)}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      backgroundColor: "background.paper",
                      "&:hover": {
                        backgroundColor: "error.light",
                        color: "error.contrastText",
                      },
                      zIndex: 1,
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>

                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                      overflow: "hidden",
                      backgroundColor: fileData.fileType.startsWith("image/")
                        ? "transparent"
                        : "grey.50",
                      borderRadius: 1,
                      mt: 1,
                    }}
                  >
                    {fileData.fileType.startsWith("image/") ? (
                      <img
                        src={fileData.preview}
                        alt={fileData.file.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : (
                      <Box sx={{ fontSize: "3rem", color: "action.active" }}>
                        {getFileIcon(fileData.fileType, fileData.file.name)}
                      </Box>
                    )}
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: "medium",
                        display: "block",
                        wordBreak: "break-word",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: 1.2,
                        maxHeight: "2.4em",
                      }}
                    >
                      {fileData.file.name}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5, display: "block" }}
                    >
                      {formatFileSize(fileData.file.size)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
