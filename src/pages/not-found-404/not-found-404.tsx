import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./not-found-404.module.css";

export const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.content}>
      <p className={styles.text}>Страница не найдена. Ошибка 404.</p>
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        size="large"
        startIcon={<ArrowBack />}
      >
        Вернуться назад
      </Button>
    </div>
  );
};
