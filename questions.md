Equipment: 

Do you want it grouped by "category"?

Do you want to be able to bring a certain number of them or is it all or nothing? 

If so, is a series of checkboxes ok? Would this approach work for People too? 

People: 

Do you want to generate a row for each in the qty? ie: 
    ```
    {
    qty: 2,
    branch: 'AR',
    rank: 'officer',
    duty: 'active',
    gender: 'F'
  }
  ```

  would expand to: 
```
  [
      { branch: 'AR', rank: 'officer', duty: 'active', name: 'F_1'},
      { branch: 'AR', rank: 'officer', duty: 'active', name: 'F_2'}
  ]
```
  (F1/F2 here being generated names based on gender)


glo-services.vmhost.devwerx.org/WeatherService/GetClimate

Doesn't seem to work

what's the difference between it and glo-services.vmhost.devwerx.org/WeatherService/GetWeatherRpt