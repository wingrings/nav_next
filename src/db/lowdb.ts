import { JSONFilePreset } from 'lowdb/node'

// Read or create db.json
const defaultData: {
  boxList: string[];
  arr: [];
  editLink: {pattern: string;text: string }
} = { 
  boxList: [],
  arr: [],
  editLink: { pattern: '',text: '' } 
}
const db = await JSONFilePreset('data/main.json', defaultData)

export default db