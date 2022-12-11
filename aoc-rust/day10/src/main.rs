use std::fs;

fn day10a() -> i32 {
    let binding = fs::read_to_string("tinput.txt").unwrap();
    let input = binding
        .split("\n")
        .filter(|line| !line.is_empty())
        .collect::<Vec<_>>();

    let mut xx = 1;
    let mut cycle_count = 0;
    let mut answer = 0;

    let mut check_iteration = |x: &i32| {
        cycle_count += 1;
        if [20, 60, 100, 140, 180, 220].contains(&cycle_count) {
            answer += *x * cycle_count;
        }
    };
    for line in input {
        check_iteration(&xx);
        if line != "noop" {
            let steps = line[5..].parse::<i32>().unwrap();
            check_iteration(&xx);
            xx += steps;
        }
    }
    answer
}
fn day10b() -> String {
    let binding = fs::read_to_string("input.txt").unwrap();
    let input = binding
        .split("\n")
        .filter(|line| !line.is_empty())
        .collect::<Vec<_>>();

    let mut x: i32 = 1;
    let mut cycle_count: usize = 0;

    let mut screen = String::new();

    let mut check_iteration = |x: &i32| {
        let raster_pos = cycle_count % 40;
        cycle_count += 1;

        screen.push(if raster_pos.abs_diff(*x as usize) <= 1 {
            '#'
        } else {
            '.'
        });
        if raster_pos == 39 {
            screen.push('\n')
        }
    };

    for line in input {
        let instruction = &line[..4];
        if instruction != "noop" {
            let steps = line[5..].parse::<i32>().unwrap();
            check_iteration(&x);
            check_iteration(&x);
            x += steps;
        } else {
            check_iteration(&x);
        }
    }

    screen
}

fn main() {
    println!("Part1: {}", day10a());
    println!("Part2:\n{}", day10b());
}
