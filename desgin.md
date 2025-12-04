# FinFlow UI Design Prompt for Claude Code

This document contains a comprehensive prompt to give to Claude Code for designing and implementing a modern, beautiful UI for the FinFlow Personal Finance Dashboard application.

---

## 📋 Quick Instructions

**Copy the prompt below and paste it into Claude Code to generate:**
- Modern Sign In page
- Modern Sign Up page  
- Professional Dashboard with charts and insights

---

# Prompt for Claude Code: Design Modern UI for FinFlow Finance Dashboard

I'm building a **Personal Finance Dashboard** app called **FinFlow** using Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. I need you to design and implement modern, beautiful, and professional UI for the authentication pages and dashboard.

## 🎯 Project Context

**App Name:** FinFlow  
**Purpose:** Personal finance tracking with AI-powered insights  
**Target Users:** Young professionals (25-40) who want to manage their money better  
**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, NextAuth.js  
**Brand Colors:** Blue (#3B82F6), Indigo (#6366F1), with white and gray accents

## 📋 Pages to Design

### 1. Sign In Page (`app/auth/signin/page.tsx`)
### 2. Sign Up Page (`app/auth/signup/page.tsx`)
### 3. Dashboard (`app/dashboard/page.tsx`)

---

## 🎨 Design Requirements

### Overall Design Style
- **Modern and Clean:** Minimalist with plenty of white space
- **Professional:** Trust-worthy for handling financial data
- **Glassmorphism Effects:** Subtle frosted glass effects for cards
- **Smooth Animations:** Subtle hover effects, transitions, and micro-interactions
- **Responsive:** Mobile-first approach, looks great on all screen sizes
- **Accessibility:** Proper contrast ratios, keyboard navigation, ARIA labels

### Color Palette
```
Primary: Blue #3B82F6
Secondary: Indigo #6366F1
Accent: Purple #8B5CF6
Success: Green #10B981
Danger: Red #EF4444
Warning: Amber #F59E0B
Background: Gradient from blue-50 to indigo-100
Cards: White with subtle shadows
Text: Gray-900 for headings, Gray-600 for body
```

### Typography
- **Headings:** Bold, modern sans-serif (Inter font)
- **Body:** Clean, readable (Inter font)
- **Font Sizes:** Use Tailwind's default scale (text-sm, text-base, text-lg, etc.)

### Components to Use
- shadcn/ui components: Button, Card, Input, Label, Alert, Badge, Tabs
- Custom gradient backgrounds
- Floating label inputs (modern style)
- Icon integration using lucide-react

---

## 📄 Page-Specific Requirements

### 1. Sign In Page Design

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│                 [Background Gradient]                    │
│                                                          │
│  ┌─────────────────────────────────────────┐            │
│  │                                          │            │
│  │         Welcome Back to FinFlow          │  Centered │
│  │    Sign in to manage your finances       │   Card    │
│  │                                          │            │
│  │  ┌────────────────────────────────┐     │            │
│  │  │ Email                          │     │            │
│  │  └────────────────────────────────┘     │            │
│  │                                          │            │
│  │  ┌────────────────────────────────┐     │            │
│  │  │ Password                       │     │            │
│  │  └────────────────────────────────┘     │            │
│  │                                          │            │
│  │  [Sign In Button - Full Width]          │            │
│  │                                          │            │
│  │  ─────────── OR ───────────              │            │
│  │                                          │            │
│  │  [🔵 Sign in with Google]               │            │
│  │                                          │            │
│  │  Don't have an account? Sign up          │            │
│  └─────────────────────────────────────────┘            │
│                                                          │
│              ← Back to home                              │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- [ ] Floating label inputs that animate on focus
- [ ] Password visibility toggle (eye icon)
- [ ] "Remember me" checkbox option
- [ ] "Forgot password?" link (styled but can be non-functional for now)
- [ ] Error messages display in red alert box at top
- [ ] Success message display in green alert box
- [ ] Loading state on button (spinner + disabled state)
- [ ] Google button with official Google colors and icon
- [ ] Smooth fade-in animation when page loads
- [ ] Card has subtle shadow and hover effect (slight lift)
- [ ] Background has animated gradient or subtle pattern

**Micro-interactions:**
- Input fields glow on focus (blue ring)
- Button scales slightly on hover (transform: scale(1.02))
- Smooth transitions (200-300ms)

---

### 2. Sign Up Page Design

**Layout:** Similar to Sign In but with additional fields

```
┌─────────────────────────────────────────────────────────┐
│                 [Background Gradient]                    │
│                                                          │
│  ┌─────────────────────────────────────────┐            │
│  │                                          │            │
│  │         Create Your Account              │  Centered │
│  │    Start managing your finances today    │   Card    │
│  │                                          │            │
│  │  ┌────────────────────────────────┐     │            │
│  │  │ Full Name                      │     │            │
│  │  └────────────────────────────────┘     │            │
│  │                                          │            │
│  │  ┌────────────────────────────────┐     │            │
│  │  │ Email                          │     │            │
│  │  └────────────────────────────────┘     │            │
│  │                                          │            │
│  │  ┌────────────────────────────────┐     │            │
│  │  │ Password                       │     │            │
│  │  └────────────────────────────────┘     │            │
│  │  Password strength indicator             │            │
│  │                                          │            │
│  │  ┌────────────────────────────────┐     │            │
│  │  │ Confirm Password               │     │            │
│  │  └────────────────────────────────┘     │            │
│  │                                          │            │
│  │  [Create Account Button]                 │            │
│  │                                          │            │
│  │  ─────────── OR ───────────              │            │
│  │                                          │            │
│  │  [🔵 Sign up with Google]               │            │
│  │                                          │            │
│  │  Already have an account? Sign in        │            │
│  └─────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

**Unique Features:**
- [ ] Real-time password strength indicator (weak/medium/strong)
  - Progress bar that changes color (red → yellow → green)
  - Show requirements: "At least 6 characters"
- [ ] Confirm password field shows checkmark when matched
- [ ] Email validation indicator (valid/invalid icon)
- [ ] Terms of service checkbox (styled)
- [ ] Multi-step animation (fields fade in sequentially)

---

### 3. Dashboard Design

**Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│  [Header Bar]                                  👤 User Menu   │
│  FinFlow                              user@email.com  Sign Out│
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Financial Dashboard                                          │
│  Welcome back, John!                                          │
│                                                               │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────────┐ │
│  │💰 Total   │  │🏦 Accounts│  │📊 This    │  │💳 Cards  │ │
│  │  Balance  │  │           │  │   Month   │  │          │ │
│  │           │  │           │  │           │  │          │ │
│  │ $12,450   │  │     3     │  │  -$2,340  │  │    2     │ │
│  │  +2.5%    │  │  Connected│  │   Spent   │  │  Active  │ │
│  └───────────┘  └───────────┘  └───────────┘  └──────────┘ │
│                                                               │
│  ┌────────────────────────────┐  ┌─────────────────────────┐│
│  │ 💡 AI Insights             │  │ Quick Actions           ││
│  │                            │  │                         ││
│  │ • You spent 30% more on    │  │ [➕ Add Transaction]    ││
│  │   dining this month        │  │ [🏦 Connect Bank]       ││
│  │ • Great job! You're under  │  │ [📊 View Reports]       ││
│  │   budget in entertainment  │  │ [⚙️ Settings]           ││
│  │ • Consider setting aside   │  │                         ││
│  │   $500 for savings         │  │                         ││
│  └────────────────────────────┘  └─────────────────────────┘│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Recent Transactions                        [View All →]  ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ 🍔 McDonald's             Yesterday        -$12.50      ││
│  │ 🛒 Walmart                Dec 2            -$85.42      ││
│  │ ⛽ Shell Gas Station      Dec 1            -$45.00      ││
│  │ 💼 Salary Deposit         Dec 1          +$3,500.00    ││
│  │ ☕ Starbucks              Nov 30           -$6.75       ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌──────────────────────┐  ┌──────────────────────────────┐ │
│  │ Spending by Category │  │ Budget Overview              │ │
│  │                      │  │                              │ │
│  │   [Pie Chart]        │  │ Food      ████████░░ 80%    │ │
│  │                      │  │ Transport ██████░░░░ 60%    │ │
│  │                      │  │ Shopping  ███████████ 110%  │ │
│  │                      │  │           (Over budget!)     │ │
│  └──────────────────────┘  └──────────────────────────────┘ │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**Dashboard Components:**

#### Header/Navigation
- [ ] Top bar with app logo/name
- [ ] User profile dropdown (name, email, sign out)
- [ ] Sticky header on scroll
- [ ] Breadcrumb navigation
- [ ] Search bar (optional, styled but non-functional for now)

#### Stats Cards (Top Row)
- [ ] 4 card grid (responsive: 1 col on mobile, 2 on tablet, 4 on desktop)
- [ ] Each card has:
  - Icon (emoji or lucide-react icon)
  - Label
  - Large number/value
  - Small trend indicator (+2.5% in green)
- [ ] Hover effect: slight lift with shadow increase
- [ ] Loading skeleton state
- [ ] Gradient backgrounds (subtle, different per card)

#### AI Insights Card
- [ ] Purple/indigo gradient header with sparkle icon ✨
- [ ] Bullet points with insights
- [ ] "Generate new insights" button
- [ ] Loading state with animated dots
- [ ] Expandable/collapsible (click to see more)

#### Quick Actions Card
- [ ] Grid of action buttons
- [ ] Each button has icon + label
- [ ] Hover effects
- [ ] Modal/drawer opens on click (can be placeholder)

#### Recent Transactions List
- [ ] Table/list view with alternating row colors
- [ ] Each row has:
  - Emoji/icon for category
  - Merchant name
  - Date (relative: "Yesterday", "2 days ago")
  - Amount (negative in red, positive in green)
- [ ] Hover effect on rows
- [ ] "View All" link in header
- [ ] Loading skeleton with shimmer effect

#### Charts Section
- [ ] Side-by-side layout (1 col on mobile, 2 on desktop)
- [ ] Pie chart for spending by category (use recharts or chart.js)
- [ ] Budget progress bars with colors (green/yellow/red based on %)
- [ ] Animated on scroll/load

#### Empty States
- [ ] When no bank accounts connected:
  - Large icon (🏦)
  - "No accounts connected yet"
  - "Connect your first bank account to get started"
  - Primary CTA button
- [ ] When no transactions:
  - Friendly illustration or icon
  - Encouraging message

---

## 🎭 Animations & Interactions

### Page Load Animations
```typescript
// Use framer-motion or CSS animations
- Fade in from opacity 0 to 1
- Slide up slightly (translateY: 20px to 0)
- Stagger children (cards appear one by one)
- Duration: 300-500ms
- Easing: ease-out
```

### Hover Effects
- Cards: lift (translateY: -4px) + shadow increase
- Buttons: scale(1.02) + brightness increase
- Links: underline animation (left to right)
- Input fields: border glow

### Loading States
- Skeleton screens for data fetching
- Spinner for buttons during submission
- Progress bar for form completion
- Shimmer effect on cards

### Transitions
- All transitions smooth (transition-all duration-200)
- Color changes: 150ms
- Size changes: 200ms
- Position changes: 300ms

---

## 📱 Responsive Design

### Breakpoints
```
Mobile: < 640px (sm)
Tablet: 640px - 1024px (md/lg)
Desktop: > 1024px (xl)
```

### Layout Changes
- **Sign In/Up:** Card width adjusts (full width on mobile, max-w-md on desktop)
- **Dashboard Stats:** 1 → 2 → 4 columns
- **Charts:** Stacked on mobile, side-by-side on desktop
- **Navigation:** Hamburger menu on mobile, full menu on desktop

---

## 🔧 Technical Implementation Details

### File Structure
```
app/
├── auth/
│   ├── signin/
│   │   └── page.tsx          ← Sign In page
│   └── signup/
│       └── page.tsx          ← Sign Up page
├── dashboard/
│   └── page.tsx              ← Dashboard page
└── layout.tsx

components/
├── ui/                       ← shadcn/ui components
├── dashboard/
│   ├── stats-card.tsx
│   ├── ai-insights.tsx
│   ├── transactions-list.tsx
│   ├── spending-chart.tsx
│   └── budget-overview.tsx
└── auth/
    ├── auth-form.tsx
    └── google-button.tsx
```

### State Management
- Use React `useState` for form states
- Loading states for async operations
- Error states for form validation
- Success states for feedback

### Form Validation
```typescript
// Email validation
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Password strength
const getPasswordStrength = (password: string) => {
  if (password.length < 6) return 'weak';
  if (password.length < 10) return 'medium';
  return 'strong';
};
```

---

## 🎨 Design Inspiration References

**Style similar to:**
- Stripe Dashboard (clean, professional)
- Linear (smooth animations, modern)
- Notion (minimalist, functional)
- Revolut (financial, trustworthy)

**Avoid:**
- Cluttered layouts
- Too many colors
- Excessive animations
- Small, hard-to-read text

---

## ✅ Acceptance Criteria

### Sign In Page
- [ ] Form validates email format
- [ ] Shows password visibility toggle
- [ ] Displays error messages clearly
- [ ] Loading state on submit
- [ ] Google sign-in button works
- [ ] Responsive on all screen sizes
- [ ] Smooth animations

### Sign Up Page
- [ ] Password strength indicator works
- [ ] Confirm password validation
- [ ] All fields validate properly
- [ ] Success message after signup
- [ ] Multi-step feel (smooth progression)
- [ ] Matches Sign In page style

### Dashboard
- [ ] All cards display properly
- [ ] Charts render correctly
- [ ] Transactions list formatted well
- [ ] Loading states work
- [ ] Empty states shown when appropriate
- [ ] Responsive grid layouts
- [ ] Smooth animations on load
- [ ] User can navigate easily

---

## 🚀 Deliverables

Please provide:

1. **Complete code** for all three pages
2. **All necessary components** in the `components/` folder
3. **Tailwind configuration** if custom colors/styles are added
4. **Any additional utilities** or helper functions
5. **Comments** explaining complex parts
6. **Accessibility features** (ARIA labels, keyboard navigation)

---

## 💬 Additional Notes

- Use **TypeScript** with proper types
- Follow **Next.js 14 App Router** conventions
- Use **"use client"** directive where needed (forms, interactions)
- Implement **proper error boundaries**
- Add **console.logs** for debugging where helpful
- Make it **production-ready** but beautiful
- Focus on **user experience** - everything should feel smooth and intuitive

---

## 🎯 Priority

1. **Sign In Page** - Start here, get it perfect
2. **Sign Up Page** - Similar to Sign In
3. **Dashboard** - More complex, can iterate

Let's make this the most beautiful finance dashboard in my portfolio! 🚀

---

**Remember:** The goal is to impress recruiters with modern design, smooth UX, and clean code. Make it look like a real SaaS product!

---

## 📝 How to Use This Prompt

1. Copy the entire prompt above
2. Open Claude Code (or Claude.ai)
3. Paste the prompt
4. Claude will generate:
   - Complete sign-in page with all features
   - Complete sign-up page with password strength indicator
   - Full dashboard with all components
   - Additional helper components
   - Proper TypeScript types
   - Responsive designs

5. Review the generated code
6. Test on mobile, tablet, and desktop
7. Iterate if needed

---

## 🎨 Expected Result

After implementing this design, you'll have:

✅ **Production-ready authentication pages** that look professional  
✅ **Beautiful dashboard** with real-time data display  
✅ **Smooth animations** and micro-interactions  
✅ **Fully responsive** design across all devices  
✅ **Accessible** UI with proper ARIA labels  
✅ **Modern design** that impresses recruiters  

---

## 📚 Additional Resources

- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js 14 App Router](https://nextjs.org/docs)
- [Lucide React Icons](https://lucide.dev/)
- [Recharts Documentation](https://recharts.org/)

---

## 🤝 Support

If you need modifications or have questions about the design:
- Ask Claude Code to adjust specific components
- Request additional features
- Ask for alternative design approaches
- Request accessibility improvements

---

**Good luck building your beautiful FinFlow dashboard! 💙**