use criterion::{criterion_group, criterion_main, Criterion};

fn unique(vec: &[char]) -> bool {
    for i in 1..vec.len() {
        if vec[i..].contains(&vec[i - 1]) {
            return false;
        }
    }
    true
}

fn day6(marker: usize) -> usize {
    let contents: Vec<char> = include_str!("../input.txt").chars().collect();
    let iter = contents.windows(marker);
    for (index, c) in iter.enumerate() {
        if unique(c) {
            return index + marker;
        }
    }
    return 0;
}

fn criterion_benchmark(c: &mut Criterion) {
    let mut group = c.benchmark_group("Day 6");
    group.bench_function("days6 Part 1", |b| b.iter(|| day6(4)));
    group.bench_function("days6 Part 2", |b| b.iter(|| day6(14)));
    println!("Part one: {}", day6(4));
    println!("Part two: {}", day6(14));
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
