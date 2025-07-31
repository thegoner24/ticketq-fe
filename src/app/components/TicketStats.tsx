'use client';

interface TicketStatsProps {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  closedTickets: number;
}

export default function TicketStats({
  totalTickets,
  openTickets,
  inProgressTickets,
  closedTickets,
}: TicketStatsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
          Ticket Statistics
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-blue-50 dark:bg-blue-900 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-blue-500 dark:text-blue-200 truncate">
                  Total Tickets
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-blue-900 dark:text-blue-100">
                  {totalTickets}
                </dd>
              </dl>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-yellow-500 dark:text-yellow-200 truncate">
                  Open
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-yellow-900 dark:text-yellow-100">
                  {openTickets}
                </dd>
              </dl>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-indigo-500 dark:text-indigo-200 truncate">
                  In Progress
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-indigo-900 dark:text-indigo-100">
                  {inProgressTickets}
                </dd>
              </dl>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-green-500 dark:text-green-200 truncate">
                  Closed
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-green-900 dark:text-green-100">
                  {closedTickets}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}