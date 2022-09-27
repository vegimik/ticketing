export const stripeClient = {
  charges: {
    create: jest.fn().mockResolvedValue({}),
  },
};

// (subject: string, data: string, callback: () => void) => {
//     callback();
//   }
