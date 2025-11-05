import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Typography,
  IconButton,
  Paper,
  Grid,
  Alert,
  styled,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";

interface UploadProps {
  acceptedTypes?: string[];
  maxSize?: number;
  multiple?: boolean;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
}

interface FileWithPreview extends File {
  preview?: string;
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

export const Upload: React.FC<UploadProps> = ({
  acceptedTypes = ["image/*", ".pdf", ".doc", ".docx"],
  maxSize = 5 * 1024 * 1024,
  multiple = true,
  maxFiles = 10,
  onFilesChange,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string>("");

  const generatePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve(getFileIcon(file.type));
      }
    });
  };

  const getFileIcon = (fileType: string): string => {
    const icons: { [key: string]: string } = {
      "application/pdf": "📄",
      "application/msword": "📝",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "📝",
      "text/plain": "📄",
      "application/zip": "📦",
      "application/vnd.rar": "📦",
      default: "📁",
    };
    return icons[fileType] || icons.default;
  };

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || []);
      setError("");

      if (!multiple && selectedFiles.length > 1) {
        setError("Apenas um arquivo é permitido");
        return;
      }

      if (selectedFiles.length + files.length > maxFiles) {
        setError(`Máximo de ${maxFiles} arquivos permitidos`);
        return;
      }

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
            `Arquivo muito grande: ${file.name} (Máximo: ${formatFileSize(maxSize)})`,
          );
          return;
        }
      }

      const filesWithPreviews = await Promise.all(
        selectedFiles.map(async (file) => {
          const preview = await generatePreview(file);
          return { ...file, preview };
        }),
      );

      const newFiles = [...files, ...filesWithPreviews];
      setFiles(newFiles);
      onFilesChange?.(newFiles);
    },
    [files, multiple, maxFiles, acceptedTypes, maxSize, onFilesChange],
  );

  const isFileTypeAccepted = (file: File, acceptedTypes: string[]): boolean => {
    return acceptedTypes.some((type) => {
      if (type.endsWith("/*")) {
        const category = type.split("/")[0];
        return file.type.startsWith(`${category}/`);
      }
      return (
        file.type === type ||
        file.name.toLowerCase().endsWith(type.toLowerCase())
      );
    });
  };

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
    return acceptedTypes.map((type) => type.replace("/*", "")).join(", ");
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
          {formatFileSize(maxSize)} | Máximo: {maxFiles} arquivos
        </Typography>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Arquivos selecionados ({files.length})
          </Typography>

          <Grid container spacing={2}>
            {files.map((file, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={`${file.name}-${index}`}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    position: "relative",
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
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
                      fontSize: "2rem",
                      mb: 1,
                      overflow: "hidden",
                    }}
                  >
                    {file.type.startsWith("image/") ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      <Typography variant="h4">{file.preview}</Typography>
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "medium",
                      wordBreak: "break-word",
                      textAlign: "center",
                    }}
                  >
                    {file.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {formatFileSize(file.size)}
                  </Typography>

                  <Chip
                    label={file.type.split("/")[1] || file.type}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
