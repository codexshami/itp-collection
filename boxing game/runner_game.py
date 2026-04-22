import pygame, sys

pygame.init()
WIDTH, HEIGHT = 500, 700
screen = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()

player = pygame.Rect(220, 580, 60, 60)
velocity = 5
jump = False
slide = False
jump_height = 15
gravity = 1
jump_speed = jump_height

def draw_player():
    pygame.draw.rect(screen, (0, 255, 255), player)

while True:
    screen.fill((0, 0, 0))

    keys = pygame.key.get_pressed()
    if keys[pygame.K_a] and player.left > 0:
        player.x -= velocity
    if keys[pygame.K_d] and player.right < WIDTH:
        player.x += velocity
    if keys[pygame.K_w] and not jump:
        jump = True
        jump_speed = jump_height
    if keys[pygame.K_s]:
        slide = True
    else:
        slide = False

    if jump:
        player.y -= jump_speed
        jump_speed -= gravity
        if jump_speed < -jump_height:
            jump = False
            jump_speed = jump_height

    draw_player()

    pygame.display.update()
    clock.tick(60)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
