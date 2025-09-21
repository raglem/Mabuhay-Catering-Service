package com.backend.menu;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuCategoryRepository
        extends JpaRepository<MenuCategory, Integer> {
}
