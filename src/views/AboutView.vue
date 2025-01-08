<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
</script>

<template>
  <UserLayout>
    <section class="bg-gray-100 py-12 px-6 md:px-12 lg:px-24">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">🍔 Foodie Hub</h1>
        <p class="text-lg text-gray-600 mb-8">
          A modern and intuitive food ordering web application built with the
          latest technologies, designed to offer a seamless user experience.
        </p>
      </div>
      <div class="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          🌟 Project Overview
        </h2>
        <p class="text-gray-600 mb-6 leading-relaxed">
          <strong>Foodie Hub</strong> is a simulated food ordering web
          application that allows users to browse menus, add items to their
          cart, and experience a streamlined checkout process. The project
          integrates <strong>Omise</strong> for payment simulation, ensuring a
          realistic transaction workflow. With a responsive design and modern UI
          components, Foodie Hub delivers a delightful experience across
          devices.
        </p>
        <p class="text-gray-600 mb-6 leading-relaxed">
          The platform features a
          <strong>role-based access control (RBAC)</strong> system, dividing
          users into three key roles: <strong>Regular Users</strong>,
          <strong>Store Owners</strong>, and <strong>Administrators</strong>.
          Each role comes with specific permissions and access levels:
        </p>
        <ul class="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>
            <strong>Regular Users:</strong> Can browse menus, place orders, and
            manage their account details.
          </li>
          <li>
            <strong>Store Owners:</strong> Have access to a dedicated dashboard
            to manage their restaurant profile, update menus, and monitor
            orders.
          </li>
          <li>
            <strong>Administrators:</strong> Oversee the entire platform, manage
            user accounts, handle disputes, and monitor platform analytics.
          </li>
        </ul>
        <p class="text-gray-600 mb-6 leading-relaxed">
          Additionally, Foodie Hub includes a comprehensive
          <strong>monitoring dashboard</strong> that allows administrators and
          store owners to view key metrics, such as order statistics, revenue
          trends, and user activity. This feature ensures transparency,
          efficient management, and data-driven decision-making.
        </p>

        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          🛠️ Technologies Used
        </h2>
        <ul class="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>
            <strong>Vue 3:</strong> JavaScript framework for building dynamic
            user interfaces.
          </li>
          <li>
            <strong>Firebase:</strong> Backend services for authentication,
            database, and hosting.
          </li>
          <li>
            <strong>Tailwind CSS:</strong> Utility-first CSS framework for rapid
            UI development.
          </li>
          <li>
            <strong>DaisyUI:</strong> Tailwind CSS component library for
            beautiful UI components.
          </li>
          <li>
            <strong>Omise:</strong> Payment gateway API for transaction
            simulation.
          </li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          💡 Key Features
        </h2>
        <ul class="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>
            User-friendly interface for browsing food menus and placing orders.
          </li>
          <li>Simulated payment integration with <strong>Omise</strong>.</li>
          <li>
            Real-time data management using <strong>Firebase Firestore</strong>.
          </li>
          <li>
            Responsive design with <strong>Tailwind CSS</strong> and
            <strong>DaisyUI</strong>.
          </li>
          <li>User authentication for personalized experiences.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-700 mb-4">🎯 Goals</h2>
        <p class="text-gray-600 mb-6 leading-relaxed">
          The goal of <strong>Foodie Hub</strong> is to demonstrate the
          integration of modern frontend and backend technologies to create a
          functional and visually appealing food ordering platform. The app
          emphasizes scalability, responsiveness, and ease of use.
        </p>

        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          📊 Future Improvements
        </h2>
        <ul class="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>Enhancing order tracking functionality.</li>
          <li>Implementing customer reviews and ratings.</li>
          <li>Adding admin dashboard for order management.</li>
          <li>Integration with third-party delivery services.</li>
        </ul>

        <div class="text-center mt-8"></div>
      </div>
    </section>
  </UserLayout>
</template>
