import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      user_id,
      provider_id,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    // const appointments = await appointmentsRepository.find();
    return response.json([]);
  }
}
