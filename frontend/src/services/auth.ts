const API_BASE_URL = "http://localhost:8000";

export async function signup(
  fullName: string,
  email: string,
  password: string
) {
  const response = await fetch(
    `${API_BASE_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        password,
      }),
    }
  );

  return response.json();
}

export async function login(
  email: string,
  password: string
) {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    }
  );

  return response.json();
}