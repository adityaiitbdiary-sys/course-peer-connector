-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  roll_number text unique not null,
  name text not null,
  graduation_year int not null,
  phone text,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for student courses
create table student_courses (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references profiles(id) on delete cascade not null,
  course_code text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  grade integer check (grade >= 4 and grade <= 10),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for student_courses
alter table student_courses enable row level security;

create policy "Student courses are viewable by everyone." on student_courses
  for select using (true);

create policy "Users can insert their own courses." on student_courses
  for insert with check (auth.uid() = student_id);

create policy "Users can update their own courses." on student_courses
  for update using (auth.uid() = student_id);

create policy "Users can delete their own courses." on student_courses
  for delete using (auth.uid() = student_id);
