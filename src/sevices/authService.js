import http from "./httpService";

const apiEndpoint = "/auth/";
const apiEndpoint1 = "api/users/";
const apiEndpoint2 = "api/students/";
const apiEndpoint3 = "api/universities/";
const apiEndpoint4 = "api/porfessors/";
const apiEndpoint5 = "api/courses/";
const apiEndpoint6 = "api/recourses/";
const apiEndpoint7 = "api/comments/";
const tokenKey = "token";
const usernameMain = "username";

export async function login(username, password) {
  const { data } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, data["token"]);
  localStorage.setItem(usernameMain, username);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(usernameMain);
}

export function getCurrentUser() {
  try {
    return localStorage.getItem(usernameMain);
  } catch (ex) {
    return null;
  }
}

export async function addUser(body) {
  const { data } = await http.post(apiEndpoint1, body, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function studentRegister(body) {
  const { data } = await http.post(apiEndpoint2, body, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function UniversitytRegister(body) {
  const { data } = await http.post(apiEndpoint3, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function PorfessortRegister(body) {
  const { data } = await http.post(apiEndpoint4, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function getUniversities() {
  const { data } = await http.get(apiEndpoint3, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function getPorfessors() {
  const { data } = await http.get(apiEndpoint4, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function getStudents() {
  const { data } = await http.get(apiEndpoint2, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function verifyPorfessor(id) {
  const { data } = await http.patch(`${apiEndpoint4}${id}/`, {"verify":"True"}, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function deletePorfessor(id) {
  const { data } = await http.delete(`${apiEndpoint4}${id}/`, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function addCourse(body) {
  const { data } = await http.post(apiEndpoint5, body, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function addResourses(body) {
  const { data } = await http.post(apiEndpoint6, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function sinkSourseCourse(id,resourseId) {
  const { data } = await http.patch(`${apiEndpoint5}${id}/add_comment_resource_course/`, {resourseId}, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function sinkPorfessorCourse(id,courseId) {
  const { data } = await http.patch(`${apiEndpoint4}${id}/add_course_porfessor/`, {courseId}, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function addRate(id,user,stars) {
  const { data } = await http.post(`${apiEndpoint5}${id}/rate_course/`, {"user":user,"stars":stars}, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function addComments(body) {
  const { data } = await http.post(apiEndpoint7, body, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function sinkCommentCourse(id,commentId) {
  const { data } = await http.patch(`${apiEndpoint5}${id}/add_comment_resource_course/`, {commentId}, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export async function addFavoriteCourse(id,courseId) {
  const { data } = await http.patch(`${apiEndpoint2}${id}/add_favorute_course/`, {courseId}, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return data;
}

export default {
  login,
  logout,
  getCurrentUser,
  addUser,
  studentRegister,
  UniversitytRegister,
  PorfessortRegister,
  getUniversities,
  getPorfessors,
  getStudents,
  verifyPorfessor,
  deletePorfessor,
  addCourse,
  addResourses,
  sinkSourseCourse,
  sinkPorfessorCourse,
  addComments,
  sinkCommentCourse,
  addRate,
  addFavoriteCourse,
};
