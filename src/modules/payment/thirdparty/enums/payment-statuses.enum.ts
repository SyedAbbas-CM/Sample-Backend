export enum PaymentStatuses {
    REQUIRES_ACTION = 'requires_action',
    REQUIRES_PAYMENT_METHOD = 'requires_payment_method',
    REQUIRES_CONFIRMATION = 'requires_confirmation',
    PROCESSING = 'processing',
    REQUIRES_CAPTURE = 'requires_capture',
    CANCELED = 'canceled',
    SUCCEEDED = 'succeeded',
}