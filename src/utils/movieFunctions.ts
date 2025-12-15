export function convertToVideo(url: string): string {
  if (url.includes('youtu.be')) {
    const id = url.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes('watch?v=')) {
    const id = url.split('watch?v=')[1];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}
export const formatDate = (date: Date | null) => {
  if (!date) return null;
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};
