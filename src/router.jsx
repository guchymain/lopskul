import { createBrowserRouter } from 'react-router-dom'
import { MarketingLayout } from './layouts/MarketingLayout.jsx'
import { AppLayout } from './layouts/AppLayout.jsx'
import { InstructorLayout } from './layouts/InstructorLayout.jsx'
import { AdminLayout } from './layouts/AdminLayout.jsx'
import { RequireRole } from './components/RequireRole.jsx'

import { Landing } from './pages/marketing/Landing.jsx'
import { Pricing } from './pages/marketing/Pricing.jsx'
import { CourseDiscovery } from './pages/discovery/CourseDiscovery.jsx'
import { TrackListing } from './pages/discovery/TrackListing.jsx'
import { CategoryPage } from './pages/discovery/CategoryPage.jsx'
import { CourseDetail } from './pages/detail/CourseDetail.jsx'
import { TrackDetail } from './pages/detail/TrackDetail.jsx'
import { TrackApply } from './pages/detail/TrackApply.jsx'
import { InstructorProfile } from './pages/detail/InstructorProfile.jsx'
import { Login } from './pages/auth/Login.jsx'
import { Signup } from './pages/auth/Signup.jsx'
import { OnboardingWizard } from './pages/auth/OnboardingWizard.jsx'
import { Checkout } from './pages/checkout/Checkout.jsx'
import { CertificateVerify } from './pages/certificate/CertificateVerify.jsx'
import { CertificatePage } from './pages/certificate/CertificatePage.jsx'
import { InstructorApply } from './pages/instructor/InstructorApply.jsx'
import { NotFound } from './pages/NotFound.jsx'

import { Dashboard } from './pages/learner/Dashboard.jsx'
import { MyLearning } from './pages/learner/MyLearning.jsx'
import { Profile } from './pages/learner/Profile.jsx'
import { Settings } from './pages/learner/Settings.jsx'
import { Notifications } from './pages/learner/Notifications.jsx'
import { CommunityHome } from './pages/community/CommunityHome.jsx'
import { ThreadDetail } from './pages/community/ThreadDetail.jsx'
import { CoursePlayer } from './pages/player/CoursePlayer.jsx'
import { QuizRunner } from './pages/player/QuizRunner.jsx'
import { ProjectSubmission } from './pages/player/ProjectSubmission.jsx'
import { CourseComplete } from './pages/player/CourseComplete.jsx'

import { InstructorDashboard } from './pages/instructor/InstructorDashboard.jsx'
import { InstructorCourses } from './pages/instructor/InstructorCourses.jsx'
import { CourseBuilder } from './pages/instructor/CourseBuilder.jsx'
import { StudentManagement } from './pages/instructor/StudentManagement.jsx'
import { QnAModeration } from './pages/instructor/QnAModeration.jsx'

import { AdminDashboard } from './pages/admin/AdminDashboard.jsx'
import { UserManagement } from './pages/admin/UserManagement.jsx'
import { CourseModeration } from './pages/admin/CourseModeration.jsx'
import { PaymentsOverview } from './pages/admin/PaymentsOverview.jsx'
import { SupportQueue } from './pages/admin/SupportQueue.jsx'

export const router = createBrowserRouter([
  {
    element: <MarketingLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/courses', element: <CourseDiscovery /> },
      { path: '/courses/:slug', element: <CourseDetail /> },
      { path: '/categories/:slug', element: <CategoryPage /> },
      { path: '/tracks', element: <TrackListing /> },
      { path: '/tracks/:slug', element: <TrackDetail /> },
      { path: '/tracks/:slug/apply', element: <TrackApply /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/instructors/:handle', element: <InstructorProfile /> },
      { path: '/certificates/:certId/verify', element: <CertificateVerify /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/teach/apply', element: <InstructorApply /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/signup/onboarding',
    element: (
      <RequireRole>
        <OnboardingWizard />
      </RequireRole>
    ),
  },
  {
    path: '/checkout/:itemType/:itemId',
    element: <Checkout />,
  },
  {
    path: '/certificates/:certId',
    element: <CertificatePage />,
  },
  {
    element: (
      <RequireRole role="learner">
        <AppLayout />
      </RequireRole>
    ),
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/dashboard/my-learning', element: <MyLearning /> },
      { path: '/profile', element: <Profile /> },
      { path: '/settings', element: <Settings /> },
      { path: '/notifications', element: <Notifications /> },
      { path: '/community', element: <CommunityHome /> },
      { path: '/community/:threadId', element: <ThreadDetail /> },
    ],
  },
  {
    path: '/learn/:courseId/:lessonId',
    element: (
      <RequireRole role="learner">
        <CoursePlayer />
      </RequireRole>
    ),
  },
  {
    path: '/learn/:courseId/quiz/:quizId',
    element: (
      <RequireRole role="learner">
        <QuizRunner />
      </RequireRole>
    ),
  },
  {
    path: '/learn/:courseId/projects/:projectId',
    element: (
      <RequireRole role="learner">
        <ProjectSubmission />
      </RequireRole>
    ),
  },
  {
    path: '/learn/:courseId/complete',
    element: (
      <RequireRole role="learner">
        <CourseComplete />
      </RequireRole>
    ),
  },
  {
    element: (
      <RequireRole role="instructor">
        <InstructorLayout />
      </RequireRole>
    ),
    children: [
      { path: '/instructor', element: <InstructorDashboard /> },
      { path: '/instructor/courses', element: <InstructorCourses /> },
      { path: '/instructor/courses/new', element: <CourseBuilder /> },
      { path: '/instructor/courses/:id/edit', element: <CourseBuilder /> },
      { path: '/instructor/courses/:id/students', element: <StudentManagement /> },
      { path: '/instructor/courses/:id/qna', element: <QnAModeration /> },
    ],
  },
  {
    element: (
      <RequireRole role="admin">
        <AdminLayout />
      </RequireRole>
    ),
    children: [
      { path: '/admin', element: <AdminDashboard /> },
      { path: '/admin/users', element: <UserManagement /> },
      { path: '/admin/courses', element: <CourseModeration /> },
      { path: '/admin/payments', element: <PaymentsOverview /> },
      { path: '/admin/support', element: <SupportQueue /> },
    ],
  },
])
