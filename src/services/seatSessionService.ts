import axiosInstance from './axiosInstance';

export type SeatSessionDto = {
  sessionId: string;
  projectionId: number;
  expiresAt: number;
};

export async function startSeatSession(
  projectionId: number
): Promise<SeatSessionDto> {
  const res = await axiosInstance.post(`/seat-sessions/start/${projectionId}`);
  return res.data;
}

export async function expireSeatSession(sessionId: string): Promise<void> {
  await axiosInstance.post(`/seat-sessions/${sessionId}/expire`);
}
