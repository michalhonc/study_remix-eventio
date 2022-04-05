import type { User, Event } from '@prisma/client'

import { prisma } from '~/db.server'

export function getEvent({ id }: Pick<Event, 'id'>) {
  return prisma.event.findFirst({
    where: { id },
    include: { user: true, attendees: true },
  })
}

export function getEventListItems({ userId }: { userId: User['id'] }) {
  return prisma.event.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  })
}

export function getEvents() {
  return prisma.event.findMany({
    orderBy: { updatedAt: 'desc' },
  })
}

export function createEvent({
  body,
  title,
  date,
  time,
  capacity,
  userId,
}: Event & {
  userId: User['id']
}) {
  return prisma.event.create({
    data: {
      title,
      body,
      date,
      time,
      capacity,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
}

export function joinEvent({
  id,
  userId,
}: Pick<Event, 'id'> & { userId: User['id'] }) {
  return prisma.event.update({
    where: { id },
    data: {
      attendees: {
        connect: [{ id: userId }],
      },
    },
    select: {
      attendees: true,
    },
  })
}

export function leaveEvent({
  id,
  userId,
}: Pick<Event, 'id'> & { userId: User['id'] }) {
  return prisma.event.update({
    where: { id },
    data: {
      attendees: {
        disconnect: [{ id: userId }],
      },
    },
    select: {
      attendees: true,
    },
  })
}

export function deleteEvent({ id }: Pick<Event, 'id'>) {
  return prisma.event.deleteMany({
    where: { id },
  })
}

export function secureDeleteEvent({
  id,
  userId,
}: Pick<Event, 'id'> & { userId: User['id'] }) {
  return prisma.event.deleteMany({
    where: { id, userId },
  })
}
