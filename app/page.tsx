"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Mission Control
          </h1>
          <p className="text-gray-600">Task Control Center - Under Construction</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <p className="text-center text-gray-700">
            The mission control system is being set up. Please check back soon!
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl mb-2">Calendar</div>
              <div className="text-sm text-gray-600">Task Scheduling</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <div className="text-2xl mb-2">Memories</div>
              <div className="text-sm text-gray-600">Knowledge Base</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl mb-2">Team</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg text-center">
              <div className="text-2xl mb-2">Office</div>
              <div className="text-sm text-gray-600">Work Status</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <div className="text-2xl mb-2">Pipeline</div>
              <div className="text-sm text-gray-600">Content Pipeline</div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg text-center">
              <div className="text-2xl mb-2">Analytics</div>
              <div className="text-sm text-gray-600">Data Insights</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
