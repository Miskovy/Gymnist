CREATE TABLE `user` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` str NOT NULL,
  `email` email NOT NULL,
  `password` str NOT NULL,
  `Phone` str NOT NULL,
  `Gender` ENUM ('Male', 'Female'),
  `Age` int NOT NULL,
  `Birthdate` date NOT NULL,
  `Nationality` str NOT NULL,
  `country_id` int,
  `city_id` int,
  `state_id` int,
  `image` str,
  `code` int NOT NULL
);

CREATE TABLE `country` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` str NOT NULL
);

CREATE TABLE `City` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` str,
  `country_id` int
);

CREATE TABLE `State` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` str,
  `city_id` int
);

CREATE TABLE `trainees` (
  `trainee_id` int,
  `Last_in` timestamp NOT NULL
);

CREATE TABLE `Major` (
  `major_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` str
);

CREATE TABLE `trainer` (
  `trainer_id` int,
  `Major_id` int
);

CREATE TABLE `Package_Subscription` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `trainee_id` int,
  `package_id` int,
  `duration` ENUM ('Monthly', 'Quarterly', 'Semi_Annually', 'Annually'),
  `price` int DEFAULT 0,
  `payment_method_id` int,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `remaining_entrance` int DEFAULT 0
);

CREATE TABLE `Package` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` str NOT NULL,
  `num_of_members` int DEFAULT 0,
  `MaxEntranceCount` int NOT NULL,
  `description` text NOT NULL,
  `image` str,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `payment_method_id` int,
  `price_Monthly` int NOT NULL,
  `price_Quarterly` int NOT NULL,
  `price_semi_annually` int NOT NULL,
  `price_annually` int NOT NULL
);

CREATE TABLE `payment_method` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` str,
  `image` str,
  `description` text,
  `is_active` bool DEFAULT true,
  `type` ENUM ('Auto', 'Manual')
);

CREATE TABLE `class_Schedules` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `class_id` int,
  `room_id` int,
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NOT NULL,
  `status` ENUM ('Upcoming', 'Completed', 'Cancelled')
);

CREATE TABLE `class` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` str NOT NULL,
  `description` text,
  `image` str,
  `price` int DEFAULT 0,
  `trainer_id` int,
  `class_gender` ENUM ('Male', 'Female', 'Mix'),
  `room_id` int,
  `discount_id` int,
  `trainee_id` int,
  `is_Private` bool DEFAULT false
);

CREATE TABLE `class_booking` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `trainee_id` int,
  `class_schedule_id` int,
  `price` int DEFAULT 0,
  `payment_method_id` int,
  `status` ENUM ('Booked', 'Cancelled', 'Attended')
);

CREATE TABLE `Discount` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` str,
  `type` ENUM ('percentage', 'value') NOT NULL,
  `value` int NOT NULL,
  `is_active` bool
);

CREATE TABLE `Room_Gallery` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `room_id` int,
  `image` str
);

CREATE TABLE `Room` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` str,
  `image` str,
  `gallery_id` int,
  `capacity` int DEFAULT 0,
  `description` text
);

CREATE TABLE `Rent` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `room_id` int,
  `price` int DEFAULT 0,
  `trainer_id` int,
  `start_date` timestamp,
  `end_date` timestamp,
  `status` ENUM ('Upcoming', 'Completed', 'Cancelled')
);

CREATE TABLE `Currency` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` str,
  `code` str
);

CREATE TABLE `gym_gallery` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `img` str,
  `type_img` ENUM ('logo', 'cover', 'thumbnail', 'gallery')
);

CREATE TABLE `Attendance` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `trainee_id` int,
  `trainer_id` int,
  `service_type` ENUM ('Package', 'Class', 'Private', 'Rent'),
  `service_id` int,
  `class_schedule_id` int
);

ALTER TABLE `user` ADD FOREIGN KEY (`country_id`) REFERENCES `country` (`id`);

ALTER TABLE `user` ADD FOREIGN KEY (`city_id`) REFERENCES `City` (`id`);

ALTER TABLE `user` ADD FOREIGN KEY (`state_id`) REFERENCES `State` (`id`);

ALTER TABLE `City` ADD FOREIGN KEY (`country_id`) REFERENCES `country` (`id`);

ALTER TABLE `State` ADD FOREIGN KEY (`city_id`) REFERENCES `City` (`id`);

ALTER TABLE `trainees` ADD FOREIGN KEY (`trainee_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `trainer` ADD FOREIGN KEY (`trainer_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `trainer` ADD FOREIGN KEY (`Major_id`) REFERENCES `Major` (`major_id`);

ALTER TABLE `Package_Subscription` ADD FOREIGN KEY (`trainee_id`) REFERENCES `trainees` (`trainee_id`);

ALTER TABLE `Package_Subscription` ADD FOREIGN KEY (`package_id`) REFERENCES `Package` (`id`);

ALTER TABLE `Package_Subscription` ADD FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`);

ALTER TABLE `Package` ADD FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`);

ALTER TABLE `class_Schedules` ADD FOREIGN KEY (`class_id`) REFERENCES `class` (`id`);

ALTER TABLE `class_Schedules` ADD FOREIGN KEY (`room_id`) REFERENCES `Room` (`id`);

ALTER TABLE `class` ADD FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`trainer_id`);

ALTER TABLE `class` ADD FOREIGN KEY (`room_id`) REFERENCES `Room` (`id`);

ALTER TABLE `class` ADD FOREIGN KEY (`discount_id`) REFERENCES `Discount` (`id`);

ALTER TABLE `class` ADD FOREIGN KEY (`trainee_id`) REFERENCES `trainees` (`trainee_id`);

ALTER TABLE `class_booking` ADD FOREIGN KEY (`trainee_id`) REFERENCES `trainees` (`trainee_id`);

ALTER TABLE `class_booking` ADD FOREIGN KEY (`class_schedule_id`) REFERENCES `class_Schedules` (`id`);

ALTER TABLE `class_booking` ADD FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`);

ALTER TABLE `Room_Gallery` ADD FOREIGN KEY (`room_id`) REFERENCES `Room` (`id`);

ALTER TABLE `Room` ADD FOREIGN KEY (`gallery_id`) REFERENCES `Room_Gallery` (`id`);

ALTER TABLE `Rent` ADD FOREIGN KEY (`room_id`) REFERENCES `Room` (`id`);

ALTER TABLE `Rent` ADD FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`trainer_id`);

ALTER TABLE `Attendance` ADD FOREIGN KEY (`trainee_id`) REFERENCES `trainees` (`trainee_id`);

ALTER TABLE `Attendance` ADD FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`trainer_id`);

ALTER TABLE `Attendance` ADD FOREIGN KEY (`class_schedule_id`) REFERENCES `class_Schedules` (`id`);
