import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Si estás usando react-router-dom para navegación

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch("http://localhost:8080/logout", {
          method: "GET", // Cambiado a GET ya que usualmente los logout se manejan con GET
          credentials: "include", // Para enviar cookies con la solicitud
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          console.log("Successfully logged out");
          navigate("/login"); // Redirige a la página de login o a otra página
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
