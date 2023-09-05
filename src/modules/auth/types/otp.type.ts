export type GenerateOtpType = {
  email: string;
  subject?: string;
};

export type VerifyOtpType = {
  otpRetries: number;
  otp: number;
};
