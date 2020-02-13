CREATE DATABASE IF NOT EXISTS `matcha`;
USE `matcha`;

DROP TABLE IF EXISTS `verifies`;
DROP TABLE IF EXISTS `logs`;
DROP TABLE IF EXISTS `users_and_tags`;
DROP TABLE IF EXISTS `appears`;
DROP TABLE IF EXISTS `visits`;
DROP TABLE IF EXISTS `likes`;
DROP TABLE IF EXISTS `unlikes`;
DROP TABLE IF EXISTS `blocks`;
DROP TABLE IF EXISTS `reports`;
DROP TABLE IF EXISTS `messages`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `tags`;

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `first_name` varchar(100) DEFAULT '',
  `last_name` varchar(100) DEFAULT '',
  `birth_year` year,
  `gender` tinyint(1) DEFAULT '0',
  `preference_gender` tinyint(1) DEFAULT '0',
  `preference_min_age` tinyint(255) unsigned DEFAULT '0',
  `preference_max_age` tinyint(255) unsigned DEFAULT '254',
  `preference_max_distance` int DEFAULT '-1',
  `address` varchar(255),
  `latitude` float,
  `longitude` float,
  `bio` text,
  `picture1` varchar(255) NOT NULL DEFAULT 'default.png',
  `picture2` varchar(255) DEFAULT '',
  `picture3` varchar(255) DEFAULT '',
  `picture4` varchar(255) DEFAULT '',
  `picture5` varchar(255) DEFAULT '',
  `notification` tinyint(1) DEFAULT '1',
  `verify` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `verifies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `user_email` varchar(255) NOT NULL DEFAULT '',
  `uuid` varchar(255) NOT NULL DEFAULT '',
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `verify_user_id`(`user_id`),
  KEY `verify_user_email`(`user_email`),
  CONSTRAINT `verify_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `verify_user_email` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `info` varchar(255) NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `log_user_id`(`user_id`),
  CONSTRAINT `log_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `users_and_tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `tag_id` bigint unsigned NOT NULL,
  `type` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_and_tag_user_id`(`user_id`),
  KEY `user_and_tag_tag_id`(`tag_id`),
  CONSTRAINT `user_and_tag_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `user_and_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `appears` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `from` bigint unsigned NOT NULL,
  `to` bigint unsigned NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `checked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `appear_from`(`from`),
  KEY `appear_to`(`to`),
  CONSTRAINT `appear_from` FOREIGN KEY (`from`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `appear_to` FOREIGN KEY (`to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `visits` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `from` bigint unsigned NOT NULL,
  `to` bigint unsigned NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `checked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `visit_from`(`from`),
  KEY `visit_to`(`to`),
  CONSTRAINT `visit_from` FOREIGN KEY (`from`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `visit_to` FOREIGN KEY (`to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `likes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `from` bigint unsigned NOT NULL,
  `to` bigint unsigned NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `checked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `like_from`(`from`),
  KEY `like_to`(`to`),
  CONSTRAINT `like_from` FOREIGN KEY (`from`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `like_to` FOREIGN KEY (`to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `unlikes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `from` bigint unsigned NOT NULL,
  `to` bigint unsigned NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `checked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `unlike_from`(`from`),
  KEY `unlike_to`(`to`),
  CONSTRAINT `unlike_from` FOREIGN KEY (`from`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `unlike_to` FOREIGN KEY (`to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `blocks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `from` bigint unsigned NOT NULL,
  `to` bigint unsigned NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `checked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `block_from`(`from`),
  KEY `block_to`(`to`),
  CONSTRAINT `block_from` FOREIGN KEY (`from`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `block_to` FOREIGN KEY (`to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `reports` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `from` bigint unsigned NOT NULL,
  `to` bigint unsigned NOT NULL,
  `reason` text NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `checked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `report_from`(`from`),
  KEY `report_to`(`to`),
  CONSTRAINT `report_from` FOREIGN KEY (`from`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `report_to` FOREIGN KEY (`to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `messages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `from` bigint unsigned NOT NULL,
  `to` bigint unsigned NOT NULL,
  `content` text NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `checked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `message_from`(`from`),
  KEY `message_to`(`to`),
  CONSTRAINT `message_from` FOREIGN KEY (`from`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `message_to` FOREIGN KEY (`to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;