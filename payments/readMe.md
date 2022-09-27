Payments Service

[order:created] [order:cancelled]
    |               |
    |               |
    -----------------
            |
            |
            V
    ---------------------
    | Payments Service  |
    |     [charges]     |
    |     [orders]      |
    ---------------------
            |
            V
     [charge:created]

===============================================


[order:created] [order:cancelled]
    |               |
    |               |
    -----------------
            |
            |
            V
    ---------------------
    | Payments Service  |
    |     [charges]     |
    |     [orders]      |
    ---------------------
            |
            V
     [payment:created]