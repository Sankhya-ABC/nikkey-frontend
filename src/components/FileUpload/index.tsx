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

interface FileUploadProps {
  acceptedTypes?: string[];
  maxSize?: number; // em bytes
  multiple?: boolean;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
}

interface FileWithPreview extends File {
  preview?: string;
  fileType?: string;
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
  maxSize = 5 * 1024 * 1024, // 5MB padrão
  multiple = true,
  maxFiles = 10,
  onFilesChange,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string>("");

  const getFileType = (file: File): string => {
    // Fallback para arquivos sem type definido
    return file.type || "application/octet-stream";
  };

  const getFileExtension = (filename: string): string => {
    return filename
      .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
      .toLowerCase();
  };

  const generatePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const fileType = getFileType(file);

      if (fileType.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        // Ícone padrão para arquivos não-image
        resolve(getFileIcon(fileType, file.name));
      }
    });
  };

  const getFileIcon = (fileType: string, filename: string = ""): string => {
    const extension = getFileExtension(filename);

    const iconMap: { [key: string]: string } = {
      // Documentos
      "application/pdf": "📄",
      "application/msword": "📝",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "📝",
      "application/vnd.ms-excel": "📊",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "📊",
      "application/vnd.ms-powerpoint": "📽️",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        "📽️",
      "text/plain": "📄",
      "text/csv": "📊",

      // Arquivos compactados
      "application/zip": "📦",
      "application/x-zip-compressed": "📦",
      "application/vnd.rar": "📦",
      "application/x-rar-compressed": "📦",
      "application/x-tar": "📦",
      "application/gzip": "📦",

      // Imagens
      "image/jpeg": "🖼️",
      "image/png": "🖼️",
      "image/gif": "🖼️",
      "image/svg+xml": "🖼️",
      "image/webp": "🖼️",

      // Áudio
      "audio/mpeg": "🎵",
      "audio/wav": "🎵",
      "audio/ogg": "🎵",

      // Vídeo
      "video/mp4": "🎬",
      "video/avi": "🎬",
      "video/mov": "🎬",
      "video/webm": "🎬",

      // Código
      "text/html": "📋",
      "text/css": "📋",
      "application/javascript": "📋",
      "text/x-python": "📋",
      "text/x-java": "📋",
      "text/x-c++": "📋",
    };

    // Tenta encontrar pelo tipo MIME primeiro
    if (iconMap[fileType]) {
      return iconMap[fileType];
    }

    // Fallback para extensões comuns
    const extensionMap: { [key: string]: string } = {
      pdf: "📄",
      doc: "📝",
      docx: "📝",
      xls: "📊",
      xlsx: "📊",
      ppt: "📽️",
      pptx: "📽️",
      txt: "📄",
      csv: "📊",
      zip: "📦",
      rar: "📦",
      js: "📋",
      jsx: "📋",
      ts: "📋",
      tsx: "📋",
      html: "📋",
      css: "📋",
      py: "📋",
      java: "📋",
      cpp: "📋",
    };

    return extensionMap[extension] || "📁";
  };

  const isFileTypeAccepted = (file: File, acceptedTypes: string[]): boolean => {
    if (acceptedTypes.length === 0) return true;

    const fileType = getFileType(file);
    const fileExtension = getFileExtension(file.name);

    return acceptedTypes.some((type) => {
      // Se for um tipo MIME com wildcard (ex: "image/*")
      if (type.endsWith("/*")) {
        const category = type.split("/")[0];
        return fileType.startsWith(`${category}/`);
      }

      // Se for um tipo MIME específico (ex: "application/pdf")
      if (type.includes("/")) {
        return fileType === type;
      }

      // Se for uma extensão (ex: ".pdf")
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

      // Resetar o input para permitir selecionar o mesmo arquivo novamente
      event.target.value = "";

      // Validações
      if (!multiple && selectedFiles.length > 1) {
        setError("Apenas um arquivo é permitido");
        return;
      }

      if (selectedFiles.length + files.length > maxFiles) {
        setError(`Máximo de ${maxFiles} arquivos permitidos`);
        return;
      }

      const validFiles: FileWithPreview[] = [];

      for (const file of selectedFiles) {
        // Validar tipo
        if (
          acceptedTypes.length > 0 &&
          !isFileTypeAccepted(file, acceptedTypes)
        ) {
          setError(`Tipo de arquivo não permitido: ${file.name}`);
          return;
        }

        // Validar tamanho
        if (file.size > maxSize) {
          setError(
            `Arquivo muito grande: ${file.name} (Máximo: ${formatFileSize(maxSize)})`,
          );
          return;
        }

        validFiles.push(file);
      }

      try {
        // Gerar previews
        const filesWithPreviews = await Promise.all(
          validFiles.map(async (file) => {
            const preview = await generatePreview(file);
            const fileType = getFileType(file);
            return {
              ...file,
              preview,
              fileType,
            };
          }),
        );

        const newFiles = [...files, ...filesWithPreviews];
        setFiles(newFiles);
        onFilesChange?.(newFiles);
      } catch (err) {
        console.error("Erro ao gerar previews:", err);
        setError("Erro ao processar os arquivos");
      }
    },
    [files, multiple, maxFiles, acceptedTypes, maxSize, onFilesChange],
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
      // Simular um change event para reutilizar a lógica existente
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
      {/* Área de Upload */}
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
          {formatFileSize(maxSize)} | Máximo: {maxFiles} arquivos
        </Typography>
      </Paper>

      {/* Mensagem de erro */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Preview dos arquivos */}
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
                key={`${file.name}-${index}-${file.lastModified}`}
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
                  {/* Botão de deletar */}
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

                  {/* Preview */}
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
                      backgroundColor: "grey.50",
                      borderRadius: 1,
                    }}
                  >
                    {file.fileType?.startsWith("image/") ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                        onError={(e) => {
                          // Fallback se a imagem não carregar
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement!.innerHTML = getFileIcon(
                            file.fileType || "",
                            file.name,
                          );
                        }}
                      />
                    ) : (
                      <Typography variant="h4">
                        {getFileIcon(file.fileType || "", file.name)}
                      </Typography>
                    )}
                  </Box>

                  {/* Informações do arquivo */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "medium",
                      wordBreak: "break-word",
                      textAlign: "center",
                      width: "100%",
                    }}
                    noWrap
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
                    label={
                      file.fileType?.split("/")[1] ||
                      getFileExtension(file.name) ||
                      "arquivo"
                    }
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
