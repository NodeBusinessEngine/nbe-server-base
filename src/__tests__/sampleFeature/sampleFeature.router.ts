import { NBERequest, NBEResponse, nbeSend } from '../../common-domain/http-common';

const testUserData = [
  { id: 1, name: 'Suren Rodrigo', age: 39, sex: 'Male' },
  { id: 2, name: 'Thamali Rodrigo', age: 43, sex: 'Female' },
  { id: 3, name: 'Patrick Rodrigo', age: 73, sex: 'Male' },
  { id: 4, name: 'Dilika Rodrigo', age: 46, sex: 'Female' },
  { id: 5, name: 'Irangani Rodrigo', age: 74, sex: 'Female' },
];

export const getAllHandler = async (req: NBERequest, res: NBEResponse) => {
  nbeSend(200, testUserData, res);
};
export const getByIdHandler = async (req: NBERequest, res: NBEResponse) => {
  const id: number = parseInt(req.params.id, 10);
  const throwException = req.params.throwException ? true : false;
  try {
    if (throwException) throw new Error('Testing Error Thrown');
    const result = testUserData.find((user) => user.id === id);
    if (result) {
      nbeSend(200, result, res);
    } else {
      nbeSend(404, 'User Not Found', res);
    }
  } catch (e) {
    nbeSend(500, e.message, res);
  }
};

export const createHandler = async (req: NBERequest, res: NBEResponse) => {
  try {
    const { id = 0, name = '', age = 0, sex = '' } = req.body;
    if (!id || !name || !age || !sex) {
      nbeSend(400, 'Data Missing to Create the user', res);
    } else {
      const newUser = { id, name, age, sex };
      testUserData.push(newUser);
      nbeSend(201, newUser, res);
    }
  } catch (e) {
    nbeSend(500, e.message, res);
  }
};
