import type Duty from './duties.interface';
import dutiesRepository from './duties.repository';

class DutiesServices {
  async createDuty(duty: Omit<Duty, 'id'>): Promise<Duty> {
    return dutiesRepository.createDuty(duty);
  }

  async getAllDuties(): Promise<Duty[]> {
    return dutiesRepository.getAllDuties();
  }

  async getDutyById(id: Duty['id']): Promise<Duty | undefined> {
    return dutiesRepository.getDutyById(id);
  }

  async updateDuty(id: Duty['id'], updatedDuty: Partial<Omit<Duty, 'id'>>): Promise<Duty | undefined> {
    return dutiesRepository.updateDuty(id, updatedDuty);
  }

  async deleteDuty(id: Duty['id']): Promise<boolean> {
    return dutiesRepository.deleteDuty(id);
  }
}

export default new DutiesServices();