import type Duty from './duties.interface';
import { query } from '../../../providers/postgres.provider';

class DutiesRepository {

  async getAllDuties(): Promise<Duty[]> {
    const result = await query<Duty>('SELECT id, name FROM duties ORDER BY name ASC');
    return result.rows;
  }

  async getDutyById(id: Duty['id']): Promise<Duty | undefined> {
    const result = await query<Duty>('SELECT id, name FROM duties WHERE id = $1', [id]);
    return result.rows[0];
  }
  
  async createDuty(duty: Omit<Duty, 'id'>): Promise<Duty> {
    const result = await query<Duty>(
      'INSERT INTO duties (name) VALUES ($1) RETURNING id, name',
      [duty.name],
    );

    return result.rows[0];
  }

  async updateDuty(id: Duty['id'], updatedDuty: Partial<Omit<Duty, 'id'>>): Promise<Duty | undefined> {
    if (updatedDuty.name === undefined) {
      return this.getDutyById(id);
    }

    const result = await query<Duty>(
      'UPDATE duties SET name = $2 WHERE id = $1 RETURNING id, name',
      [id, updatedDuty.name],
    );

    return result.rows[0];
  }

  async deleteDuty(id: Duty['id']): Promise<boolean> {
    const result = await query('DELETE FROM duties WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}

export default new DutiesRepository();