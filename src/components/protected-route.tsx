import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

// 페이지를 이동하는 동안에 지속적으로 User를 검증하기 위함
// 토큰 만료시 더 이상 다른 기능을 사용할 수 없음
async function fetchUser() {
  let token = localStorage.getItem("token");
  try {
    await axios.get(
      "http://localhost:8000/account/fetch-user/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).response.status === 401) { // Unauthorized
      // 토큰 갱신 요청
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const response = await axios.post(
          "http://localhost:8000/account/refresh/",
          {
            refresh: refreshToken,
          }
        );
        token = response.data.access;
        if (token) {
          localStorage.setItem("token", token);
        }

        // 갱신된 토큰으로 사용자 정보 요청 재시도
        await axios.get(
          "http://localhost:8000/account/fetch-user/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (refreshError) {
        toast.error("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        throw refreshError;
      }
    } else {
      toast.error("로그인이 만료되었습니다. 다시 로그인 해주세요.");
      throw error;
    }
  }
}

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, isError } = useQuery("user", fetchUser);
  // isLoading을 확인하지 않는다면, fetchUser가 서버로 부터 사용자 정보를 서버로부터 
  // 가져오는 동안에도 user가 undefined가 되어버리기 때문에, 로그인페이지로 redirect
  // 데이터가 로드되는 동안에는 리다이렉트 하지 않도록 하고, 로드 후 user가 undefined인지 확인 후 리다이렉트 할 건지 결정하도록
  if (isLoading) {
    return <div>Loading...</div>; // Or your own loading component
  }
  if (isError || (data as unknown as { exists?: boolean })?.exists === false) {
    return <Navigate to="/login" />;
  }
  return children;
}
