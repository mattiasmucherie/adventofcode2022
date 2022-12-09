use criterion::{criterion_group, criterion_main, Criterion};
use std::collections::HashSet;
use std::fs;

const DIRS: [[i32; 2]; 4] = [[1, 0], [-1, 0], [0, 1], [0, -1]];

fn day9() -> usize {
    let knots = 10;
    let binding = fs::read_to_string("input.txt").unwrap();
    let input = binding
        .split("\n")
        .filter(|line| !line.is_empty())
        .collect::<Vec<_>>();

    let mut visited = vec![false; 100000];

    let mut rope = vec![[0, 0]; knots];

    for i in input {
        let direction = &i[..1];
        let steps: i32 = i[2..].parse().unwrap();

        let dir = match direction {
            "R" => 0,
            "L" => 1,
            "U" => 2,
            "D" => 3,
            _ => panic!("Invalid direction"),
        };

        for _ in 0..steps {
            // Set HEAD
            rope[0] = [rope[0][0] + DIRS[dir][0], rope[0][1] + DIRS[dir][1]];

            // Set Knots
            for j in 1..knots {
                // Check if further than one dir away
                if rope[j - 1]
                    .iter()
                    .zip(rope[j].iter())
                    .any(|(a, b)| (a - b).abs() > 1)
                {
                    rope[j] = [
                        rope[j][0] + (rope[j - 1][0] - rope[j][0]).signum(),
                        rope[j][1] + (rope[j - 1][1] - rope[j][1]).signum(),
                    ];
                }
            }

            let tail = [rope[knots - 1][0], rope[knots - 1][1]];
            let index = (tail[0] + 50) as usize * 100 + (tail[1] + 50) as usize;
            visited[index] = true;
        }
    }

    visited.iter().filter(|&v| *v).count()
}

fn criterion_benchmark(c: &mut Criterion) {
    let mut group = c.benchmark_group("Day 9");
    group.bench_function("days9", |b| b.iter(|| day9()));
    let sum = day9();
    println!("Part {}", sum);
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
