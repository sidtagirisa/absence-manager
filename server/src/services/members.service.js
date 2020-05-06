import path from 'path';
import readJsonFile from '../utils/readJsonFile.util';

const MEMBERS_PATH = path.join(__dirname, '../json_files', 'members.json');

const getMembers = () => {
  return readJsonFile(MEMBERS_PATH);
};

export { getMembers };
