# React Colors
[Live link](https://hnguyen1179.github.io/React-Colors/)</br></br>
![Intro Gif](https://user-images.githubusercontent.com/19617238/119578127-d0ae4200-bd70-11eb-831f-ffca62249ad9.gif)

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [Highlights](#highlights)
4. [Future Direction](#future-direction)

# Introduction

One of the biggest problems for me when starting on the front end of any project is coming up with a color scheme and so I built a tool to help out with the process. React Colors allows you to create and save custom color palettes. Once saved, you're able to come back to those palettes and copy the Hex or RGB color code from selected colors.
</br>
</br>
In addition to helping manage color palettes, React Colors also helps you create a starting palette of 5 colors and recommend you colors based on your palette's colors through the use of the [colormind](http://colormind.io/) API, which generates colors based on a machine learning model. 

## Technologies

**Frontend** <br/> 
Travel Seville is entirely built on the front end using Gatsby, which is based on React. The very little state management was done via Session Storage.


# Highlights
* **Smooth Animations** - animations were all done with the help of the GSAP library, CSS transitions, or keyframes ... 

![introduction](https://user-images.githubusercontent.com/19617238/106970555-fc45e780-6701-11eb-807b-3e20a2d1489c.gif)
</br>
</br>
... react-transition-group library was used for the SVG animations
</br>
</br>
![explore](https://user-images.githubusercontent.com/19617238/106970542-f2bc7f80-6701-11eb-9931-2415d58de4dd.gif)
</br>

* **Google Maps API** - Helps users visually see their day trip and allows them to interact with the markers in order to quickly scroll to their destination.
<img width="1392" alt="GoogleMapsAPI" src="https://user-images.githubusercontent.com/19617238/106971043-f43a7780-6702-11eb-9763-bfbac4909a17.png">

</br>
</br>

![daytrip](https://user-images.githubusercontent.com/19617238/106971518-f2bd7f00-6703-11eb-8604-4bf022facbab.gif)


* **Pathfinding Algorithm** - finding the most efficient path across the selected waypoints was done using a genetic algorithm. Included in this genetic algorithm was the use of *simulated annealing* in order to help boost the probablity of finding the most efficient path 

  ``` javascript
  const geneticTSP = points => {
    const numberOfGenerations = 1000
    const sizeOfPopulation = 500
    const generations = []
    const order = []
    const mutationRateMin = 0.125
    const coolingFactor = 0.5

    let currentGeneration = 0
    let mutationRate = 100
    let bestConfig
    let bestFitness = -Infinity

    // Creating the original orders array
    for (let i = 0; i < points.length; i++) order[i] = i

    // Shuffling the order array and creating a Configuration object with unnormalized fitness scores
    for (let i = 0; i < sizeOfPopulation; i++) {
      const shuffledOrder = shuffle(order.slice())
      generations.push(new Configuration(points, shuffledOrder))
    }

    // Normalizing the fitness scores of each generation
    normalizeFitness(generations)

    // Populate new generations based on the fitness probabilites of the previous generations,
    // mutating them and crossing them over before assigning to a new generation
    while (currentGeneration < numberOfGenerations) {
      for (let i = 0; i < generations.length; i++) {
        const randomConfigurationOne = pickOne(generations)
        const randomConfigurationTwo = pickOne(generations)

        const randomConfiguration = crossOver(
          points,
          randomConfigurationOne,
          randomConfigurationTwo
        )
        
        const nextMutationRate = mutationRate <= mutationRateMin 
          ? mutationRateMin 
          : mutationRate 
          
        generations[i] = mutate(randomConfiguration, nextMutationRate);
      }

      normalizeFitness(generations)

      for (let i = 0; i < generations.length; i++) {
        if (bestFitness < generations[i].fitness) {
          bestFitness = generations[i].fitness
          bestConfig = generations[i]
        }
      }
      currentGeneration++
      mutationRate = 100 * (coolingFactor ** currentGeneration)
    }

    return bestConfig
  }
  ```
  
## Future Direction
* Possible mobile integration
