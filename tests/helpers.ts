import { Response } from "express";

export const createMockResponse = () => {
  const res = {} as Response & {
    status: jest.Mock;
    json: jest.Mock;
    send: jest.Mock;
  };

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);

  return res;
};
