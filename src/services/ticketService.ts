import axiosInstance from './axiosInstance'; // adjust path

export async function expireBooking(bookingId: number): Promise<void> {
  try {
    await axiosInstance.delete(`/bookings/${bookingId}/expire`);
  } catch (error) {}
}

export async function downloadTicketPdf(bookingId: number) {
  const res = await axiosInstance.get(`/bookings/${bookingId}/ticket.pdf`, {
    responseType: 'blob',
  });

  const blob = new Blob([res.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `ticket-${bookingId}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
